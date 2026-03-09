const phoneImageMap = {
    "iPhone12": "iphone12.jpg",
    "iPhone13": "iphone13.jpg",
    "GalaxyS21": "galaxyS21.jpg",
    "Pixel5": "pixel5.jpg"
};

function getFallbackImage(product) {
    return product ? phoneImageMap[product] || 'defaultImage.jpg' : 'defaultImage.jpg';
}

const featuredProducts = [
    "iPhone12",
    "iPhone13",
    "GalaxyS21",
    "Pixel5"
].map(product => phoneImageMap[product]);

// Example usage
console.log(getFallbackImage("iPhone12")); // Outputs the correct image path