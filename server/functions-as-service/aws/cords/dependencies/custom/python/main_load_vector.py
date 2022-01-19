import startup

def session(text):
    global model
    output = model(text)
    output = [float(y) for x in output for y in x]
    return output

if __name__ == '__main__':
    global model
    model = startup.load_model()
