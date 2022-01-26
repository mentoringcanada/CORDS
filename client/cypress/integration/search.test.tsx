describe("Search", () => {
	it("has correct default values", () => {
		// visit basic search page
		cy.visit("/search");

		// search bar defaults
		cy.findByRole("textbox", { name: "query" }).should("have.value", "");
		cy.findByRole("textbox", { name: "location" }).should("have.value", "");

		// filter defaults
		cy.findByRole("option", { name: "100 km" }).should("be.selected", true);
		cy.findByRole("checkbox", { name: "211" }).should("be.checked");
		cy.findByRole("checkbox", { name: "Mentor" }).should("be.checked");
		cy.findByRole("checkbox", { name: "Magnet" }).should("be.checked");
	});
	it("correctly sets values from url", () => {
		// visit search page with custom params
		cy.visit(
			"/search?q=food&loc=toronto&community_services=false&employment=false&volunteer=false&distance=50"
		);

		// search bar values
		cy.findByRole("textbox", { name: "query" }).should(
			"have.value",
			"food"
		);
		cy.findByRole("textbox", { name: "location" }).should(
			"have.value",
			"toronto"
		);

		// filter values
		cy.findByRole("option", { name: "50 km" }).should("be.selected", true);
		cy.findByRole("checkbox", { name: "211" }).should("not.be.checked");
		cy.findByRole("checkbox", { name: "Mentor" }).should("not.be.checked");
		cy.findByRole("checkbox", { name: "Magnet" }).should("not.be.checked");
	});
});
