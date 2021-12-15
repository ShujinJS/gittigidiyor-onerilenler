var featuring = document.getElementById("featuring");
var sideNav = document.getElementById("sideNav");


async function App(){

    let result = await fetch("./product-list.json");
    if (result.ok){

        // recommendedProducts
        let jsondata = await result.json();
        //console.log(jsondata);
        let recommendedProducts = jsondata.responses[0][0].params.recommendedProducts;
        console.log(recommendedProducts);

        // recommendedProducts içerisindeki her object'i bir array içerisine aldım.
        var myProducts = Object.keys(recommendedProducts).map(key => recommendedProducts[key]);
        console.log(myProducts);
        myProducts.splice(6,2);
        console.log(myProducts);

        // userCategories
        var userCategories = jsondata.responses[0][0].params.userCategories;
        console.log(userCategories)
    }

    var usersIndex = 0;
    var currentImages = 0;

    var productList = document.createElement("ul");
    productList.classList.add("item-container");    

    // userCategories sideNav'a ekle
    sideNav.appendChild(createTabs(userCategories));
    
    let userTabs = document.querySelector(".tab-container");
    let prevBtn = document.getElementById("prevBtn");
    

    function hidePrevBtn(){
        if(currentImages==0){
            prevBtn.style.visibility = "hidden";
        }else{
            prevBtn.style.visibility = "visible";
        }
    }
    function slideProducts(){
        currentImages = 0;
        var maxMediaQuery = window.matchMedia("(max-width: 700px)");
        var minMediaQuery = window.matchMedia("(min-width: 700px)");
        let nextBtn = document.getElementById("nextBtn");



        function hideNextBtn(){
            if(maxMediaQuery.matches){
                if(currentImages==items.length-2){
                    nextBtn.style.visibility = "hidden";
                }else{
                    nextBtn.style.visibility = "visible";
                }
            }else if(minMediaQuery.matches){
                if(currentImages==items.length-4){
                    nextBtn.style.visibility = "hidden";
                }else{
                    nextBtn.style.visibility = "visible";
                }
            }
  
        }

        hidePrevBtn();

        function animateSlide(){
            if(currentImages<items.length-1){
                productList.style.left = `${currentImages*(-190)}px`;
            }
        }

        prevBtn.addEventListener("click", () => {
            if(currentImages<items.length-1){
                currentImages-=1;
                console.log(currentImages)
                animateSlide();
                hidePrevBtn();
                hideNextBtn();
            }


        })


        nextBtn.addEventListener("click", () => {
                if(maxMediaQuery.matches){               
                    if(currentImages<items.length-1){
                        currentImages+=1;
                        console.log(currentImages)
                        animateSlide();
                        hidePrevBtn();
                        hideNextBtn();
                    }
                }else if(minMediaQuery.matches){
                    if(currentImages<items.length-4){
                        currentImages+=1;
                        console.log(currentImages)
                        animateSlide();
                        hidePrevBtn();
                        hideNextBtn();
                    }
                }
        })
    }

    slideProducts();
    function resetSlide(){
        currentImages = 0;
        productList.style.left = `${currentImages}`;
        hidePrevBtn();
    }

    let tabFirst = document.getElementById(0);
    var aSide = Array.from(document.querySelectorAll("a"));
    var tabSide = Array.from(document.querySelectorAll("li.tab"))

    // linklere tıkladığında aksiyon al
    userTabs.addEventListener("click", (e)=>{

        var selectedTab;
        let trgt = e.target.getAttribute("id");
        
        if(e.target.tagName.toLowerCase() === 'a'){
   
            selectedTab = e.target;
            console.log(selectedTab)
            aSide.map(key => {
                key.classList.remove("activeLink");
            })
    
            tabSide.map(key => {
                key.classList.remove("activeTab");
            })
            selectedTab.classList.add("activeLink");
            selectedTab.parentElement.classList.add("activeTab");

            let selectedIndex = selectedTab.getAttribute("id");
            console.log(Number(selectedIndex));
            updateFeaturing(Number(selectedIndex));
            resetSlide();
        }


        


    });

    // başlangıçta ürünleri görüntüle
    defaultDisplay();
    function defaultDisplay(){
        updateFeaturing(usersIndex);
        tabFirst.classList.add("activeLink");       
        tabFirst.parentElement.classList.add("activeTab"); 
        addCart();
    }


    // sepete eklediğinde popup görüntüle
    let popUp = document.getElementById("popUp");
    addCart();
    function addCart(){
        let cartBtn = Array.from(document.getElementsByClassName("add-to-cart"));
        cartBtn.map(key => {

            key.addEventListener("click",(e)=>{
                console.log(e);
                popUp.classList.remove("fade");
                setTimeout(function(){
                    popUp.classList.add("fade");
                },400);
            })

        })

    }

    // kullanıcıdan gelen index'e göre ürünleri güncelle
    function updateFeaturing(usersIndex){
        switch(usersIndex){
            case 0:
                productList.innerHTML = "";
                getItems(myProducts, usersIndex);
                addCart();
                break;
            case 1:
                productList.innerHTML = "";
                getItems(myProducts, usersIndex);
                addCart();
                break;
            case 2:
                productList.innerHTML = "";
                getItems(myProducts, usersIndex);
                addCart();
                break;
            case 3:
                productList.innerHTML = "";
                getItems(myProducts, usersIndex);
                addCart();
                break;
            case 4:
                productList.innerHTML = "";
                getItems(myProducts, usersIndex);
                addCart();
                break;
            case 5:
                productList.innerHTML = "";
                getItems(myProducts, usersIndex);
                addCart();
                break;
        }
    }

    // tab oluştur
    function createTabs(tabs){
    
        var tabList = document.createElement("ul");
        tabList.style.width = "100%"
        tabList.classList.add("tab-container");
    
    
        for (let i = 0; i < tabs.length; i++) {
            var tab = document.createElement("li");
            tab.classList.add("tab");
            var tabLink = document.createElement("a");
            tabLink.setAttribute("id",i);
            tabLink.innerHTML = tabs[i].includes(">") ? tabs[i].split(">")[1] : tabs[i];
            tab.appendChild(tabLink);
            tabList.appendChild(tab);
        }
    
        return tabList;
    
    }
    // ürün card'ları oluştur
    function getItems(myProducts, usersIndex){
        items = myProducts[usersIndex];

        let {url, name, priceText, params} = items;

        item = {
            url: url,
            name: name,
            priceText: priceText,
            shippingFee: params
        }

        // card oluştur
        function createItems(items, item){   
    
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.25
            };



            let callback = (entries, observer)=>{
                entries.forEach(entry=>{
                    let childElement = entry.target.childNodes[0];
                    if(entry.isIntersecting){
                        let imageUrl = childElement.getAttribute("data-img");
                         console.log(imageUrl)
                        if(imageUrl){
                            childElement.src = imageUrl;
                            setTimeout(function (){observer.unobserve(childElement)},2000);
                        }
                    }
                })
            }

            let observer = new IntersectionObserver(callback, options);


            for (let i = 0; i < items.length; i++) {

                let {image, name, priceText, params} = items[i];
    
                // card oluşturdum
                var product = document.createElement("li");
                productList.appendChild(product);
    
                // image'ları oluşturdum ve card'a ekledim
                var imageBg = document.createElement("div");
                imageBg.innerHTML = "";
                imageBg.style.backgroundColor = "#f3f3f3"

                var productImage = document.createElement("div");
                productImage.innerHTML = `<img data-img="${image}"/>`;
                productImage.classList.add("product-image");
                product.appendChild(productImage);
    
                observer.observe(productImage);

    
                // ürünün başlığını oluşturdum ve card'a ekledim
                var productTitle = document.createElement("div");
                productTitle.innerHTML = name;
                productTitle.classList.add("product-title");
                product.appendChild(productTitle);
    
                // ürünün ücretini oluşturdum ve card'a ekledim
                var productPrice = document.createElement("div");
                productPrice.innerHTML = priceText;
                productPrice.classList.add("product-price");
                product.appendChild(productPrice);
    
                // ürünün kargo ücretini oluşturdum ve card'a ekledim
                var productShipment = document.createElement("div");
                productShipment.innerHTML = params.shippingFee=="FREE" ? `<i class="fas fa-truck"></i> Ücretsiz Kargo` : "";
                productShipment.classList.add("product-shipment");
                product.appendChild(productShipment);
    
                // sepete ekle butonunu oluşturdum ve card'a ekledim
                var addToCart = document.createElement("button");
                addToCart.innerHTML = "Sepete Ekle";
                addToCart.classList.add("add-to-cart");
                product.appendChild(addToCart);
                    
                product.classList.add("item-card");
            }
    
            return productList;
    
        }

        
        featuring.appendChild(createItems(items, item));
    }


};
App();
