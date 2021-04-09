import html2text


def convert2text(html):
    h = html2text.HTML2Text()
    h.ignore_links = True
    return h.handle(html)
