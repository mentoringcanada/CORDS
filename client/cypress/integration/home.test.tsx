describe("Home", () => {
	it("search insert works correctly", () => {
		cy.visit("/");

		// no filters
		cy.findByRole("option", { name: "distance" }).should("not.exist");
		cy.findByRole("checkbox", { name: "211" }).should("not.exist");
		cy.findByRole("checkbox", { name: "Mentor" }).should("not.exist");
		cy.findByRole("checkbox", { name: "Magnet" }).should("not.exist");
		// search from home bar
		cy.findByRole("textbox", { name: "query" }).type("food");
		cy.findByRole("textbox", { name: "location" }).type("toronto");
		cy.findByText("Toronto, ON, Canada").click();
		// stays on home page
		cy.url().should("not.include", "/search");
		// redirects to search page
		cy.findByRole("button", { name: "Search" }).click();
		cy.url().should("include", "/search");

		// search bar keeps values
		cy.findByRole("textbox", { name: "query" }).should(
			"have.value",
			"food"
		);
		cy.findByRole("textbox", { name: "location" }).should(
			"have.value",
			"Toronto, ON, Canada"
		);
	});
	it("example searches work", () => {
		cy.visit("/");

		// redirect to search page
		cy.findByRole("link", { name: "Food Bank" }).click();
		cy.url().should("include", "/search");
		// has correct search value
		cy.findByRole("textbox", { name: "query" }).should(
			"have.value",
			"Food Bank"
		);
	});
});
