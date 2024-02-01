// Import the necessary OpenLayers components
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import useWfs from './dataAdd'; // Adjust the import path as necessary

// Function to create a test feature
function createTestFeature() {
    // Create a point feature with some properties
    let geom = new Point([0, 0]); // Use appropriate coordinates for your use case
    let feature = new Feature(geom);
    feature.setId('testFeatureId'); // Optionally set an ID for the feature
    feature.setProperties({
        name: 'Test Feature',
        description: 'This is a test feature for WFS add operation.'
    });
    return feature;
}

// Function to test adding a feature using WFS
function testWfsAdd() {
    // Create a test feature
    let testFeature = createTestFeature();
    // Instantiate your useWfs class with the test feature
    let wfs = new useWfs(testFeature);
    // Call the wfsAdd method to add the feature
    wfs.wfsAdd();
    // Since wfsAdd makes an asynchronous network request, you would need
    // to check your server or database to verify if the feature was added successfully.
    // This can be done through logging on the server side, checking the database,
    // or using network inspection tools in your browser's developer tools.
}

// Run the test
testWfsAdd();
