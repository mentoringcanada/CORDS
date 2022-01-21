import { render } from "@testing-library/react";
import Service, { Props } from "./Service";

describe("Service", () => {
	let expectedProps: Props;

	beforeEach(() => {
		expectedProps = {
			item_id: 7777777,
			name: "Fake service",
			distance: 50,
			description: "Fake service description",
		};
	});

	it("Renders props", () => {
		const { getByText } = render(<Service {...expectedProps} />);

		expect(getByText(expectedProps.name)).toBeVisible();
		expect(getByText(`${expectedProps.distance} km`)).toBeVisible();
		expect(getByText(expectedProps.description)).toBeVisible();
	});
});
