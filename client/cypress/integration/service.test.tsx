describe("Search", () => {
	it("has correct default values", () => {
		// visit basic service page
		cy.visit("/service/73443253");

		// // search bar defaults
		// cy.findByRole("textbox", { name: "query" }).should(
		// 	"have.value",
		// 	""
		// );
		// cy.findByRole("textbox", { name: "location" }).should(
		// 	"have.value",
		// 	""
		// );

		// // filter defaults
		// cy.findByRole("option", { name: "100 km" }).should(
		// 	"be.selected",
		// 	true
		// );
		// cy.findByRole("checkbox", { name: "211" }).should("be.checked");
		// cy.findByRole("checkbox", { name: "Mentor" }).should("be.checked");
		// cy.findByRole("checkbox", { name: "Magnet" }).should("be.checked");
	});
});
