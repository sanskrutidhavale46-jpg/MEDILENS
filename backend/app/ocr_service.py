import os

import pytesseract
from PIL import Image, ImageEnhance, ImageFilter
from pypdf import PdfReader
from pdf2image import convert_from_path


def extract_text(file_path: str) -> str:
    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        text = text.strip()

        if len(text) >= 50:
            return text

        pages = convert_from_path(
            file_path,
            dpi=300
        )

        ocr_text = ""

        for page in pages:
            page_text = pytesseract.image_to_string(
                page,
                config="--psm 6"
            )

            if page_text:
                ocr_text += page_text + "\n"

        return ocr_text.strip()

    elif extension in [".jpg", ".jpeg", ".png"]:
        image = Image.open(file_path).convert("L")

        image = image.resize(
            (image.width * 3, image.height * 3)
        )

        image = ImageEnhance.Contrast(image).enhance(2.0)

        image = image.filter(
            ImageFilter.SHARPEN
        )

        text = pytesseract.image_to_string(
            image,
            config="--psm 6"
        )

        return text.strip()

    else:
        raise ValueError(
            "Unsupported file type. Use PDF, JPG, JPEG, or PNG."
        )
