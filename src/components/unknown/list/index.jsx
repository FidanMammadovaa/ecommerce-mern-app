import React from "react";
import ListItem from "../listItem";

export default function List({ items, pageType, updateItemQuantity, removeItem }) {
  return (
    <form className="flex flex-1">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      <ul className="flex flex-col flex-1 border-t border-b border-gray-200 divide-y divide-gray-200">
        {items.map((item, itemIndex) => (
          <ListItem
            key={item._id}
            item={item}
            itemIndex={itemIndex}
            pageType={pageType}
            updateItemQuantity={updateItemQuantity}
            removeItem={removeItem}
          />
        ))}
      </ul>
    </form>
  );
}
