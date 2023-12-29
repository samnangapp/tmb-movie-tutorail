import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTU3MWFkYjE5ZDllMzJlOTk1NTE2ZjdmZDllNjM0NyIsInN1YiI6IjY1OGE5ZTNlMzI1YTUxNTc3ZTAzMjYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hh_bGffJAmJBLiz9lsxdCDuMoQTgfkPdmT-zyiKZgOg",
      },
    }
  );
  return json(await url.json());
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Max-width for large screens, full width for smaller screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:max-w-1200">
        <div className="relative">
          {/* Full-width cover image with responsive behavior */}
          <img
            className="w-full h-75 object-cover rounded"
            src="https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/xpba0Dxz3sxV3QgYLR8UIe1LAAX.jpg"
            alt="Cover"
          />
          {/* Search form over cover image */}
          <div className="absolute top-20 right-4 left-4 -mb-4">
            <h2 className="text-4xl text-white font-medium mb-2">
              Welcome TMB Movie & TV Show.
            </h2>
            <form className="w-100 max-w-[100%]">
              <label
                htmlFor="search"
                className="block text-white text-sm font-medium mb-2"
              >
                Millions of movies, TV shows and people to discover. Explore
                now.
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search for a movie, tv show, person......"
                  className="w-full bg-white-800 text-black rounded-full px-4 py-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 bg-blue-500 hover:text-gray-300 text-white font-normal py-2 px-4 rounded-full"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {/* Centered heading with Guardian color (adjust as needed) */}
          <h2 className="text-center text-2xl font-bold text-blue-500 mt-6">
            Top Trending Movies
          </h2>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-6">
          {data.results.map((movie: any) => (
            <div
              key={movie.title}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
