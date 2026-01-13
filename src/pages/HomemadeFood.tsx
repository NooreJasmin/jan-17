import React from "react";

const HomemadeFood: React.FC = () => {
  return (
    <>
      <header>
        <h1 className="page-title">Homemade Food</h1>
        <p>Fresh • Hygienic • Made with Love</p>
      </header>

      {/* Girl Images */}
      <div className="girl-row">
        <img src="/image/cheif1.png" className="girl" />
        <img src="/image/cheif2.png" className="girl" />
        <img src="/image/imageg3.png" className="girl" />
        <img src="/image/cheif3.png" className="girl" />
        <img src="/image/cheif4.png" className="girl" />
      </div>

      {/* Category */}
      <div className="category">
        <span>All</span>
        <span>Snacks</span>
        <span>Meals</span>
        <span>Desserts</span>
      </div>

      {/* Food Items */}
      <div className="food-container">
        {/* GIRL 1 */}
        <div className="food-card meals">
          <img src="/image/vegmeals.png" />
          <h3>Veg Meals</h3>
          <p>₹100</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/samosa.png" />
          <h3>Samosa</h3>
          <p>₹40</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/eggfriedrice.png" />
          <h3>Egg Fried Rice</h3>
          <p>₹90</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/paneer.png" />
          <h3>Paneer Butter Masala</h3>
          <p>₹150</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/chickenbri.png" />
          <h3>Chicken Biryani</h3>
          <p>₹200</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/chapati.png" />
          <h3>Chapati with Kurma</h3>
          <p>₹120</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/eggcurry.png" />
          <h3>Egg Curry</h3>
          <p>₹130</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/masaldosa.png" />
          <h3>Masala Dosa</h3>
          <p>₹70</p>
          <button>Add to Cart</button>
        </div>

        {/* GIRL 2 */}
        <div className="food-card desserts">
          <img src="/image/chococake.jpg" />
          <h3>Chocolate Cake</h3>
          <p>₹60</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/pani.png" />
          <h3>Pani Puri</h3>
          <p>₹30</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/muruku.png" />
          <h3>Murukku</h3>
          <p>₹30</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/comilkpaya.png" />
          <h3>Coconut Milk Payasam</h3>
          <p>₹40</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/vegsan.png" />
          <h3>Veg Sandwich</h3>
          <p>₹50</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card desserts">
          <img src="/image/carrathalwa.png" />
          <h3>Carrot Halwa</h3>
          <p>₹60</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/vegroll.png" />
          <h3>Veg Roll</h3>
          <p>₹60</p>
          <button>Add to Cart</button>
        </div>

        {/* GIRL 3 */}
        <div className="food-card meals">
          <img src="/image/idly.png" />
          <h3>Idly with Sambar</h3>
          <p>₹90</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card desserts">
          <img src="/image/ragihalwa.png" />
          <h3>Ragi Halwa</h3>
          <p>₹120</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card desserts">
          <img src="/image/nutsladoo.png" />
          <h3>Dates & Nuts Ladoo</h3>
          <p>₹80</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card meals">
          <img src="/image/fishfry.png" />
          <h3>Fish Fry</h3>
          <p>₹50</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card desserts">
          <img src="/image/kolu.png" />
          <h3>Kozhukattai</h3>
          <p>₹60</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/brownie.png" />
          <h3>Brownie</h3>
          <p>₹100</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card desserts">
          <img src="/image/cupcake.jpg" />
          <h3>Cupcake</h3>
          <p>₹70</p>
          <button>Add to Cart</button>
        </div>

        <div className="food-card snacks">
          <img src="/image/egg puff.png" />
          <h3>Egg Puffs</h3>
          <p>₹50</p>
          <button>Add to Cart</button>
        </div>

        {/* GIRL 4 */}
        <div className="food-card snacks">
          <img src="/image/veg soup.png" />
          <h3>Vegetable Soup</h3>
          <p>₹90</p>
          <button>Add to Cart</button>
        </div>

        {/* GIRL 5 */}
        <div className="food-card desserts">
          <img src="/image/aval pysm.png" />
          <h3>Aval Payasam</h3>
          <p>₹90</p>
          <button>Add to Cart</button>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer">
        <h3>All Home Kitchens</h3>
        <p>Fresh • Hygienic • Made with Love</p>
        <p>📞 Contact available after selection</p>
        <p className="copy">© 2026 Homemade Food. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomemadeFood;