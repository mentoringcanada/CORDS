from .controller import search
from .libs import aws_wrapper


def lambda_handler(event, context):
    """Lambda function invoking method for search endpoint.
    """
    input_request = aws_wrapper.unpack(event)
    results = search(input_request)
    print(results)
    return aws_wrapper.pack(results)
