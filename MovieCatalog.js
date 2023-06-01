import { question as input } from 'readline-sync';
import fs from 'fs';

// Helper function to get number input from the user
export function getNumberInput(prompt = "") {
    while (true) {
        const number = parseInt(input(prompt));
        if (!isNaN(number)) {
            return number;
        }
        console.log('Invalid input. Please enter a number.');
    }
}

export default class MovieCatalog {
    catalog
    constructor() {
        this.catalog = [];
    }

    // Load the movie catalog from the JSON file
    loadCatalog() {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                this.catalog = [];
            }
            this.catalog = JSON.parse(data);
        });
    }

    // Save the movie catalog to the JSON file
    saveCatalog() {
        fs.writeFile('data.json', JSON.stringify(this.catalog), 'utf8', (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('data saved successfully.');
        });
    }

    // Display the movie catalog
    displayCatalog() {
        console.log('\nMovie Catalog =>');
        
        if (this.catalog.length == 0) {
            console.log(this.catalog);
            console.log("the  Movie Catalog is empty");
            return;
        }

        this.catalog.forEach((movie, i) => {
            console.log(`index: ${i + 1}`);
            console.log(`Title: ${movie.Title}`);
            console.log(`Director: ${movie.Director}`);
            console.log(`Release Year: ${movie.Year}`);
            console.log(`Genre: ${movie.Genre}`);
            console.log('---');
        });
    }

    // Add a new movie to the catalog
    addMovie() {
        // Prompt the user for movie details
        console.log('\nAdd New Movie:');
        const Title = input('Title: ');
        const Director = input('Director: ');
        const Year = input('Release Year: ');
        const Genre = input('Genre: ');

        // Create a new movie object
        const movie = { Title, Director, Year, Genre };

        // Add the movie to the catalog and save it
        this.catalog.push(movie);
        this.saveCatalog();
        console.log('Movie added successfully.');
    }

    // Update movie details
    updateMovie() {
        console.log('\nUpdate Movie Details:');

        // Prompt the user to select a movie
        const movieIndex = getNumberInput('Enter the movie index to update: ');
        if (movieIndex < 0 || movieIndex >= this.catalog.length) {
            console.log('Invalid movie index.');
            return;
        }

        // Prompt the user for updated movie details
        const title = input('Title: ');
        const director = input('Director: ');
        const releaseYear = input('Release Year: ');
        const genre = input('Genre: ');

        // Update the movie details
        const movie = this.catalog[movieIndex];
        movie.Title = title;
        movie.Director = director;
        movie.Year = releaseYear;
        movie.Genre = genre;

        // Save the updated catalog
        this.saveCatalog();
        console.log('Movie details updated successfully.');
    }

    // Delete a movie from the catalog
    deleteMovie() {
        console.log('\nDelete Movie:');

        // Prompt the user to select a movie
        const movieIndex = getNumberInput('Enter the movie index to delete: ');
        if (movieIndex < 0 || movieIndex >= this.catalog.length) {
            console.log('Invalid movie index.');
            return;
        }

        // Remove the movie from the catalog and save it
        const deletedMovie = this.catalog.splice(movieIndex, 1);
        this.saveCatalog();
        console.log(`Deleted Movie: ${deletedMovie[0].title}`);
    }

    // Search and filter the movie catalog
    searchAndFilter() {
        const choise = input('\nSearch and Filter \n Enter the choise to search : \n 1-Title 2-Director 3-Year 4-Genre \n')

        const keyword = input('Enter a keyword to search: ');

        const filteredMovies = this.catalog.filter((movie) => movie[choise].toLowerCase().includes(keyword.toLowerCase()));

        if (filteredMovies.length === 0) {
            console.log('No movies found.');
        } else {
            console.log('\nFiltered Movies:');
            filteredMovies.forEach((movie) => {
                console.log(`Title: ${movie.Title}`);
                console.log(`Director: ${movie.Director}`);
                console.log(`Release Year: ${movie.Year}`);
                console.log(`Genre: ${movie.Genre}`);
                console.log('---');
            });
        }
    }

    // Fetch movie data from an API
    async fetchMovieData() {
        console.log('\nFetch Movie Data:');

        // Prompt the user for the movie title
        const title = input('Enter a movie title to fetch: ');
        const url = "http://www.omdbapi.com/?i=tt3896198&apikey=5fa3eb1a"
        try {
            const response = await fetch(url + "&t=" + title);
            const data = await response.json();

            if (data.error)
                console.log('Error:', data.error);
            else {
                // Add the fetched movie to the catalog and save it
                this.catalog.push(data);
                this.saveCatalog();
                console.log('Movie fetched and added successfully.');
            }
        } catch (error) {
            console.log('An error occurred while fetching movie data:', error);
        }
    }

}


