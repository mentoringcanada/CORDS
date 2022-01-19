import aws_wrapper
from search.libs import controller

def lambda_handler(event, context):
    """Lambda function invoking method for search endpoint.
    """
    input_request = aws_wrapper.unpack(event)
    results = controller.search(input_request)
    return aws_wrapper.pack(results)
