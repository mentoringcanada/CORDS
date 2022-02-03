from . import startup

def session(text):
    output = startup.query_huggingface(text)
    output = [float(x) for x in output]
    return output