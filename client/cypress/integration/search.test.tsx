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
		cy.findByRole("option", { name: "50 km" }).should("be.selected");
		cy.findByRole("checkbox", { name: "211" }).should("not.be.checked");
		cy.findByRole("checkbox", { name: "Mentor" }).should("not.be.checked");
		cy.findByRole("checkbox", { name: "Magnet" }).should("not.be.checked");
	});

	it("normal search functionality", () => {
		cy.visit("/search");

		// pre search image
		cy.findByRole("img", { name: "Pre results image" });

		// query
		cy.findByRole("textbox", { name: "query" }).type("blue");
		// location
		cy.findByRole("textbox", { name: "location" }).type("newfoundland");
		cy.findByText("Newfoundland, Canada").click();
		// trigger search
		cy.findByRole("button", { name: "Search" }).click();

		// no results image
		cy.findByRole("img", { name: "No results image" });

		// new search
		cy.findByRole("textbox", { name: "query" }).clear().type("toronto");
		// clear location
		cy.findByRole("button", { name: "clear location" }).click(); // clear
		// new location
		cy.findByRole("textbox", { name: "location" }).type("toronto");
		cy.findByText("Toronto, ON, Canada").click();
		// trigger search
		cy.findByRole("button", { name: "Search" }).click();
		// correct page
		cy.findByRole("button", { name: "current page" }).should(
			"have.text",
			"1"
		);
		// page 2
		cy.findByRole("button", { name: "next page" }).click();
		cy.findByRole("button", { name: "current page" }).should(
			"have.text",
			"2"
		);
		// back one page
		cy.findByRole("button", { name: "visit previous page" }).click();
		cy.findByRole("button", { name: "current page" }).should(
			"have.text",
			"1"
		);
	});
});
