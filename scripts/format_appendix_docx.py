from pathlib import Path
import sys

from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


def set_run_font(run, size=None, bold=None):
    run.font.name = "Times New Roman"
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.font.bold = bold
    rpr = run._element.get_or_add_rPr()
    fonts = rpr.rFonts
    if fonts is None:
        fonts = OxmlElement("w:rFonts")
        rpr.insert(0, fonts)
    for key in ("ascii", "hAnsi", "eastAsia", "cs"):
        fonts.set(qn(f"w:{key}"), "Times New Roman")


def set_style_font(style, size, bold=False):
    style.font.name = "Times New Roman"
    style.font.size = Pt(size)
    style.font.bold = bold
    style.font.color.rgb = RGBColor(0, 0, 0)
    rpr = style.element.get_or_add_rPr()
    fonts = rpr.rFonts
    if fonts is None:
        fonts = OxmlElement("w:rFonts")
        rpr.insert(0, fonts)
    for key in ("ascii", "hAnsi", "eastAsia", "cs"):
        fonts.set(qn(f"w:{key}"), "Times New Roman")


def set_cell_borders(cell, color="D9D9D9", width="8"):
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        tag = f"w:{edge}"
        element = borders.find(qn(tag))
        if element is None:
            element = OxmlElement(tag)
            borders.append(element)
        element.set(qn("w:val"), "single")
        element.set(qn("w:sz"), width)
        element.set(qn("w:color"), color)


def shade_cell(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_margins(cell, top=95, start=110, bottom=95, end=110):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for side, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{side}"))
        if node is None:
            node = OxmlElement(f"w:{side}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


source = Path(sys.argv[1])
destination = Path(sys.argv[2])
doc = Document(source)

for section in doc.sections:
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(0.82)
    section.bottom_margin = Inches(0.82)
    section.left_margin = Inches(0.9)
    section.right_margin = Inches(0.9)

style_specs = {
    "Normal": (12, False, 0, 7),
    "Body Text": (12, False, 0, 7),
    "Title": (21, True, 0, 16),
    "Subtitle": (12, False, 0, 12),
    "Author": (12, False, 0, 14),
    "Heading 1": (16, True, 18, 8),
    "Heading 2": (13.5, True, 14, 6),
    "Heading 3": (12, True, 11, 4),
    "Caption": (10, False, 4, 8),
}

for name, (size, bold, before, after) in style_specs.items():
    if name not in doc.styles:
        continue
    style = doc.styles[name]
    set_style_font(style, size, bold)
    style.paragraph_format.space_before = Pt(before)
    style.paragraph_format.space_after = Pt(after)
    if name in ("Normal", "Body Text"):
        style.paragraph_format.line_spacing = 1.08
    if name.startswith("Heading"):
        style.paragraph_format.keep_with_next = True

# Remove inherited title borders and force all headings to black.
for name in ("Title", "Heading 1", "Heading 2", "Heading 3"):
    if name not in doc.styles:
        continue
    ppr = doc.styles[name].element.get_or_add_pPr()
    border = ppr.find(qn("w:pBdr"))
    if border is not None:
        ppr.remove(border)

for paragraph in doc.paragraphs:
    style_name = paragraph.style.name if paragraph.style else "Normal"
    if style_name == "Title":
        size, bold = 21, True
    elif style_name == "Heading 1":
        size, bold = 16, True
    elif style_name == "Heading 2":
        size, bold = 13.5, True
    elif style_name == "Heading 3":
        size, bold = 12, True
    elif style_name in ("Author", "Subtitle"):
        size, bold = 12, False
    else:
        size, bold = 12, None
    for run in paragraph.runs:
        set_run_font(run, size=size, bold=bold)

for table in doc.tables:
    table.autofit = True
    for row_index, row in enumerate(table.rows):
        if row_index == 0:
            tr_pr = row._tr.get_or_add_trPr()
            repeat = OxmlElement("w:tblHeader")
            repeat.set(qn("w:val"), "true")
            tr_pr.append(repeat)
        for cell in row.cells:
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            set_cell_borders(cell)
            set_cell_margins(cell)
            shade_cell(cell, "E8F2EF" if row_index == 0 else ("F7F8F8" if row_index % 2 == 0 else "FFFFFF"))
            for paragraph in cell.paragraphs:
                paragraph.paragraph_format.space_before = Pt(0)
                paragraph.paragraph_format.space_after = Pt(0)
                paragraph.paragraph_format.line_spacing = 1.0
                for run in paragraph.runs:
                    set_run_font(run, size=10.5, bold=True if row_index == 0 else None)

doc.core_properties.title = "Technical Appendix for the Residual Stream Geometry Experiment"
doc.core_properties.author = "Felix Odenthal"
doc.save(destination)
print(destination)
