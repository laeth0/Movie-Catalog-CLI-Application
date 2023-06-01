import MovieCatalog ,{getNumberInput} from "./MovieCatalog.js"

const movieCatalog = new MovieCatalog();
movieCatalog.saveCatalog()
//show the menu to the user
function displayMenu() {
    console.log('='.repeat(50));
    console.log('Movie Catalog Menu:');
    console.log('1. Display Movie Catalog');
    console.log('2. Add New Movie');
    console.log('3. Update Movie Details');
    console.log('4. Delete Movie');
    console.log('5. Search and Filter');
    console.log('6. Fetch Movie Data');
    console.log('0. Exit');
    console.log('\nEnter your choice:');
}

(async function runTheApp() {
    
    while (true) {

        displayMenu();
        switch (getNumberInput()) {
            case 0:
                process.exit();
            case 1:
                movieCatalog.displayCatalog();
                break;
            case 2:
                movieCatalog.addMovie();
                break;
            case 3:
                movieCatalog.updateMovie();
                break;
            case 4:
                movieCatalog.deleteMovie();
                break;
            case 5:
                movieCatalog.searchAndFilter();
                break;
            case 6:
                await movieCatalog.fetchMovieData();
                break;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
})();





