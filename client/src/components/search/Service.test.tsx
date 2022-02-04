import { render } from "@testing-library/react";
import Service from "./Service";

describe("Service", () => {
	let expectedProps: Service;

	beforeEach(() => {
		expectedProps = {
			item_id: "7777777",
			name: "Fake service",
			distance: 50,
			description: "Fake service description",
			nom: "French nom",
			lat: 43,
			lng: -80,
			address: "Toronto, On",
			link: "http://localhost:3000",
			description_fr: "French description",
			phone: "555-555-5555",
			clusterId: 202,
			resource_type: 211,
		};
	});

	it("Renders props", () => {
		const { getByText } = render(<Service service={expectedProps} />);

		expect(getByText(expectedProps.name)).toBeVisible();
		expect(getByText(`${expectedProps.distance} km`)).toBeVisible();
		expect(getByText(expectedProps.description)).toBeVisible();
	});
});
