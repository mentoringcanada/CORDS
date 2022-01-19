import startup

def session(text):
    global model
    output = model.encode(text)
    output = [float(x) for x in output]
    return output

if __name__ == '__main__':
    global model
    model = startup.load_huggingface_model()