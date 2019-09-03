const data = [
	{
		"name": "3-Year Unlimited Cloud Storage Service Activation Card - Other",
		"description": "Enjoy 3 years of unlimited Cloud storage service with this activation card, which allows you to remotely access your favorite music, movies and other media via a compatible device and enables private file sharing with loved ones.",
		"brand": "Pogoplug",
		"categories": [
			"Best Buy Gift Cards",
			"Entertainment Gift Cards"
		],
		"hierarchicalCategories": {
			"lvl0": "Best Buy Gift Cards",
			"lvl1": "Best Buy Gift Cards > Entertainment Gift Cards"
		},
		"type": "Online data backup",
		"price": 69,
		"price_range": "50 - 100",
		"image": "https://cdn-demo.algolia.com/bestbuy/1696302_sc.jpg",
		"url": "http://www.bestbuy.com/site/3-year-unlimited-cloud-storage-service-activation-card-other/1696302.p?id=1219066776306&skuId=1696302&cmp=RMX&ky=1uWSHMdQqBeVJB9cXgEke60s5EjfS6M1W",
		"free_shipping": true,
		"popularity": 10000,
		"rating": 2,
		"objectID": "1696302"
	}
]


// Taken 5 objects from the array to test with
const dataSlice = data.slice(0,5);
// initializing an empty array to save categories from each object 
let category = [];
dataSlice.forEach(data => {
	category.push(...data.categories);
});

// To avoid duplicate category after sum up categories from all objects
category = [...new Set(category)];

// initialize the content array with first 5 objects from json
let content = [];
let checkboxValues = [];
let allCategories = [];
let allBrands = [];

dataSlice.forEach(data => {
	allCategories.push(...data.categories);
	allBrands.push(data.brand);
});
// countsObjects is the key value pair for Category name and Item present in particular category
let countCategoryObject = {};
let countBrandObject = {};
let newFilteredBrands = {};
allCategories.forEach(x => countCategoryObject[x] = (countCategoryObject[x] || 0)+1 );
allBrands.forEach(x=> countBrandObject[x] = (countBrandObject[x] || 0)+1);
console.log(countBrandObject);
let countCategoryValues = Object.values(countCategoryObject);


let brand = dataSlice.map(data=> data.brand);
brand = [...new Set(brand)];

// When user clicks on checkbox, we filter the results
const handleChangeCategory = (checkbox) => {
	let categories = document.querySelector("#category-list");
	let categroiesListChecked = categories.querySelectorAll('input[type=checkbox]:checked');

	if(!categroiesListChecked.length) {
		content = [];
		newFilteredBrands = calculateCurrentBrands(dataSlice);
		document.getElementById("brand-list").innerHTML = `${brandTemplate(newFilteredBrands)}`;
		document.getElementById("product-list").innerHTML = `${productListTemplate(dataSlice)}`;
	}
	else if(checkbox.checked === true){
		let filterContent = dataSlice.filter(data => {
			return data.categories ? (data.categories.some(eachCategory => {
				if(eachCategory === checkbox.value){
					return true;
				}
			})) : null;
		});
		filterContent.map(eachResult => {
			// pushing filtered result to temporary array `content`
			content.push(eachResult);
		});
		// Avoid duplicate when clicking multiple times on single checkbox
		content = [...new Set(content)];

		newFilteredBrands = calculateCurrentBrands(content);
		//console.log("brand"+ brand);
		document.getElementById("brand-list").innerHTML = `${brandTemplate(newFilteredBrands)}`;
		document.getElementById("product-list").innerHTML = `${productListTemplate(content)}`;
	}
	else if(checkbox.checked === false){
		content = [];
		//console.log("button checked out ",content);
		let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
		//console.log("number of checked boxes ",checkboxes);
		checkboxValues = [];
		for (let i = 0; i < checkboxes.length; i++) {
			checkboxValues.push(checkboxes[i].value);
		}
		//console.log("Checkboxes values: ", checkboxValues);
		let filterContent = dataSlice.filter(data => {
			return data.categories ? (data.categories.some(eachCategory => {
				for(let j=0;j<checkboxValues.length;j++){
					if(eachCategory === checkboxValues[j]){
						return true;
					}
				}
			})) : null;
		});

		filterContent.map(eachData => {
			content.push(eachData);
		});

		newFilteredBrands = calculateCurrentBrands(content);
		document.getElementById("brand-list").innerHTML = `${brandTemplate(newFilteredBrands)}`;
		//console.log("latest content after checkedout", content);
		document.getElementById("product-list").innerHTML = `${productListTemplate(content)}`;

	}
};

const handleChangeBrand = checkbox => {

	let categories = document.querySelector("#category-list");
	let categroiesListChecked = categories.querySelectorAll('input[type=checkbox]:checked');

	let brands = document.querySelector("#brand-list");
	let brandListChecked = brands.querySelectorAll('input[type=checkbox]:checked');
	if(!brandListChecked.length && !categroiesListChecked.length) {
		content = [];
		document.getElementById("product-list").innerHTML = `${productListTemplate(dataSlice)}`;
	}
	else if(checkbox.checked === true){
		let filterContent = categroiesListChecked.length ? (
			content.filter(data => {
				return data.brand === checkbox.value;
			})
		) : (
			dataSlice.filter(data => {
				return data.brand === checkbox.value;
			})
		);
		content = [];
		filterContent.map(eachData => {
			content.push(eachData);
		});

		// Avoid duplicate when clicking multiple times on single checkbox
		content = [...new Set(content)];

		document.getElementById("product-list").innerHTML = `${productListTemplate(content)}`;
	}
	else if(!checkbox.checked){
		content = [];
		//console.log("button checked out ",content);
		//console.log("number of checked boxes ",checkboxes);
		if(!brandListChecked.length && categroiesListChecked.length){
			checkboxValues = [];
			for (let i = 0; i < categroiesListChecked.length; i++) {
				checkboxValues.push(categroiesListChecked[i].value);
			}
			//console.log("Checkboxes values: ", checkboxValues);
			let filterContent = dataSlice.filter(data => {
				return data.categories ? (data.categories.some(eachCategory => {
					for(let j=0;j<checkboxValues.length;j++){
						if(eachCategory === checkboxValues[j]){
							return true;
						}
					}
				})) : null;
			});
			filterContent.map(eachData => {
				content.push(eachData);
			});
			document.getElementById("product-list").innerHTML = `${productListTemplate(content)}`;
			console.log("new Contents " + content);
		} else {
			checkboxValues = [];
			for (let i = 0; i < brandListChecked.length; i++) {
				checkboxValues.push(brandListChecked[i].value);
			}
			//console.log("Checkboxes values: ", checkboxValues);
			let filterContent = dataSlice.filter(data => {
				for(let j=0;j<checkboxValues.length;j++){
					if(data.brand === checkboxValues[j]){
						return true;
					}
				}
			});
			filterContent.map(eachData => {
				content.push(eachData);
			});
		}
		//console.log("latest content after checkedout", content);
		document.getElementById("product-list").innerHTML = `${productListTemplate(content)}`;
	}
};

// Checkbox template made with categories list
const categoriesTemplate = categories => {

	console.log(countCategoryValues);
	return `
	  <ul class="filter-options">	
		  ${categories.map((category, i) => {
			return `<li><input type="checkbox" id="categories" onchange="handleChangeCategory(this)" name="${category}" 
				  value="${category}">${category} <span class="product-present">${countCategoryValues[i]}</span</li>`})
		.join('')
		}
	  </ul>`
}

// Product List Template
const productListTemplate = (data) => {
	return `
	  ${data.map(product => {
		return `
			  <div class="product-detail">
				  <h2 class="product-heading">${product.name}</h2>
				  <p class="product-description">${product.description}</p>
			  </div>
		  `
	}).join('')}
  `
};

const calculateCurrentBrands = (content) => {
	let countContentBrands = {};
	let currentBrand = [];
	content.map(data => {
		currentBrand.push(data.brand);
	});
	currentBrand.forEach(x => countContentBrands[x] = (countContentBrands[x] || 0)+1 );
	return countContentBrands;
};

const brandTemplate = (countBrandObject) => {
	let keys = Object.keys(countBrandObject);
	let values = Object.values(countBrandObject);

	//console.log(keys,values);
    return `
	  <ul class="filter-options">
		  ${keys.map((eachBrand, i) => {
		  	//console.log(eachBrand);
        return `<li><input type="checkbox" onchange="handleChangeBrand(this)" name="${eachBrand}" 
				  value="${eachBrand}">${eachBrand} <span id="product-present">${values[i] ? values[i] : '0'}</span</li>`})
        .join('')
        }
	  </ul>`
};

document.getElementById("category-list").innerHTML = `${categoriesTemplate(category)}`;
document.getElementById("brand-list").innerHTML = `${brandTemplate(countBrandObject)}`;
document.getElementById("product-list").innerHTML = `${productListTemplate(dataSlice)}`;
