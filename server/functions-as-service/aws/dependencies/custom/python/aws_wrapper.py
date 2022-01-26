import json

def unpack(event):
    return event
    
def pack(response):
    return {
        'statusCode': response['status_code'],
        'body': json.dumps(response['body'])
    }