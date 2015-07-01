/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have a URL', function() {
            allFeeds.forEach(function(result) {
                expect(result.url).toBeDefined();
                expect(result.url).not.toBe(''); //Ensures that URL is not an empty string
                expect(result.url).not.toEqual(jasmine.any(Number)); //Ensures URL is not a number
            });            
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a name', function() {
            allFeeds.forEach(function(result) {
                expect(result.name).toBeDefined();
                expect(result.name).not.toBe(''); //Ensures name is not an empty string
                expect(result.name).not.toEqual(jasmine.any(Number)); //Ensures name is not a number
            });            
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($("body").hasClass('menu-hidden')).toBe(true);
            //Using Jquery's .hasClass to ensure that the body has the correct class
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            var menuButton = $('.menu-icon-link');
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //Ensures that after clicking menuButton, the menu-hidden class is not present anymore
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
            //Ensures that after clicking again, the menu-hidden class is re-applied
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
        // Making all async calls before testing
            google.load('feeds', '1');
            google.setOnLoadCallback(loadFeed(0, function(){
                done();
            }));
        });

        it('are present', function(done) {
            var entry = $('.feed').find('.entry'); //Searches .feed for a .entry
            expect(entry).toBeDefined(); //Passes if the test finds an entry
            done();
        });
    });
    
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('Feed Content', function() {
        var firstFeed, secondFeed;
        //beforeEach needed for async calls
        beforeEach(function(done) {
            loadFeed(1, function() { //Load index 1 then assign HTML to firstFeed
                firstFeed = $('.feed').html();
                loadFeed(2, function() { //Load index 2 then assign HTML to secondFeed
                    secondFeed = $('.feed').html();
                    done();
                });
            });        
         });

        //ensures the first feed is loaded after the tests are done
        afterEach(function() {
            loadFeed(0);
        });

        //determine that each entry is defined
        //then make sure they are not the same
        it('changes on menu item click', function() {
            expect(firstFeed).toBeDefined();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toEqual(secondFeed);
        });
    }); 
}());
