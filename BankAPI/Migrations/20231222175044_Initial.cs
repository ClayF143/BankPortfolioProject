using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BankAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Balance = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountEntity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "adam.anderson@gmail.com", "Adam", "Anderson" },
                    { 2, "billy.baker@gmail.com", "Billy", "Baker" },
                    { 3, "carol.carson@gmail.com", "Carol", "Carson" }
                });

            migrationBuilder.InsertData(
                table: "AccountEntity",
                columns: new[] { "Id", "Balance", "UserId" },
                values: new object[,]
                {
                    { 1, 1250.0, 2 },
                    { 2, 50.0, 2 },
                    { 3, 3.2599999999999998, 3 },
                    { 4, 150.0, 1 },
                    { 5, 25123.0, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountEntity_UserId",
                table: "AccountEntity",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountEntity");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
