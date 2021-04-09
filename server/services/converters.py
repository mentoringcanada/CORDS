import html2text


def convert2text(html):
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.emphasis = False
    output = h.handle(html)
    return output.replace('\n', ' ')
