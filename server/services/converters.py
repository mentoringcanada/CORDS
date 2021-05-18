import html2text


def convert2text(html):
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.emphasis = False
    output = h.handle(html)
    return output.replace('\n', ' ')


def shrink_vector(vector):
    count = 0
    smaller_vector = []
    while count < 100:
        smaller_vector.append(vector[count*5])
        count += 1
    
    return smaller_vector