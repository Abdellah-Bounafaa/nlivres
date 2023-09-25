import BookSlider from "../components/BookSlider";

export default function Related({ relatedBooks }) {
  return (
    <div className="mt-5">
      <>
        {" "}
        <h2>Livres Similaire</h2>
        <BookSlider books={relatedBooks} />
      </>
    </div>
  );
}
