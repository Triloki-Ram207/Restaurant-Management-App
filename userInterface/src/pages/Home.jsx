import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "../components/OrderForm";
import CategoryMenu from "../components/CategoryMenu";
import FoodGrid from "../components/FoodItems";
import FooterNav from "../components/NextBtn";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { debounce } from "../utils/debounce";
import { fetchCategoryItems } from "../dataManagement/menuSlice";
import "../cssFiles/home.css";
import "../cssFiles/skeleton.css";
import { fetchMenuCategories } from "../dataManagement/menuSlice";

const Home = () => {
  const [showForm, setShowForm] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("pizza");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gridRef = useRef();

  const {
    items: categories,
    status,
    error,
    offsets,
    totals,
    loadingMore
  } = useSelector((state) => state.menu);

  const selectedItems = categories?.[selectedCategory] || [];

  // 🔍 Search filter
  const filteredItems = searchTerm.trim()
    ? selectedItems.filter((item) =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : selectedItems;

  // 🚀 Initial fetch on category change
  useEffect(() => {
    dispatch(fetchCategoryItems({ category: selectedCategory, offset: 0 }));
  }, [selectedCategory]);

  // 🌀 Scroll-based lazy loading
  useEffect(() => {
    const handleScroll = debounce(() => {
      const el = gridRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 10;

      const currentOffset = offsets[selectedCategory] || 0;
      const total = totals[selectedCategory] || Infinity;
      const alreadyLoaded = categories[selectedCategory]?.length || 0;

      if (nearBottom && alreadyLoaded < total && !loadingMore) {
        dispatch(fetchCategoryItems({ category: selectedCategory, offset: currentOffset }));
      }
    }, 300);

    const el = gridRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [selectedCategory, offsets, totals, loadingMore]);

  useEffect(() => {
  dispatch(fetchMenuCategories());
}, []);

   const getMenuData=useSelector((state)=>state.menu.categories);

  return (
    <div className="home-container">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && (
        <>
          <CategoryMenu
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            categories={getMenuData}
          />

          <div className="scrollable-grid" ref={gridRef}>
  <FoodGrid items={searchTerm ? filteredItems : selectedItems} />
  {loadingMore && <Spinner />}
</div>
        </>
      )}

      <FooterNav onNext={() => navigate("/order-summary")} />

      {showForm && (
        <div className="overlay">
          <OrderForm setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
};

export default Home;
