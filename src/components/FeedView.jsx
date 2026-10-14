import FindCard from "./FindCard";
import {
  MUSIC_STROKE,
  MOVIES_STROKE,
  ART_STROKE,
  BOOKS_STROKE,
  OTHERS_STROKE,
} from "../constants";

const CATEGORY_STROKES = {
  Music: MUSIC_STROKE,
  "Movies & TV": MOVIES_STROKE,
  Art: ART_STROKE,
  Books: BOOKS_STROKE,
  Other: OTHERS_STROKE,
};

function FeedView({ items, onDeleteFind, onEditFind }) {
  const categoriesMap = items.reduce((groups, item) => {
    const categoryName = item.type || "Other";
    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }
    groups[categoryName].push(item);
    return groups;
  }, {});

  const dynamicCategories = Object.keys(categoriesMap);

  if (dynamicCategories.length === 0) {
    return (
      <p className="text-center text-gray-400 italic py-12">
        Your feed is empty. Add a find to get started!
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col gap-y-12 text-left px-8 py-4">
      {dynamicCategories.map((categoryName) => (
        <div key={categoryName} className="w-full">
          <h3
            className="text-3xl font-bold mb-6"
            style={{
              color: "#FFFFFF",
              WebkitTextStroke:
                CATEGORY_STROKES[categoryName] || OTHERS_STROKE,
              paintOrder: "stroke fill",
            }}
          >
            {categoryName}
          </h3>

          <div className="flex gap-x-6 overflow-x-auto pb-4 scrollbar-none">
            {categoriesMap[categoryName].map((item) => (
              <FindCard
                key={item.id}
                item={item}
                onDeleteFind={onDeleteFind}
                onEditFind={onEditFind}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedView;
