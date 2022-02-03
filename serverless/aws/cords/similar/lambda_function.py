import aws_wrapper
from similar.libs import controller

def lambda_handler(event, context):
    """Lambda function invoking method for similar endpoint.
    """
    input_request = aws_wrapper.unpack(event)
    results = controller.geo_similar_search(input_request)
    return aws_wrapper.pack(results)
