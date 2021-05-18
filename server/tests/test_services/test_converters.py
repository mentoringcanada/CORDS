from services import converters


def test_convert2text():
    "testing that we can convert an html string to text"
    html_string = "<span>test</span>"
    expected_output = "test  "
    actual_output = converters.convert2text(html_string)
    assert expected_output == actual_output
