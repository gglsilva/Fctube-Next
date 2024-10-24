"use client";

import { Play } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// async function getPosts(): Promise<Post[]> {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   return res.json();
// }
const POSTS_PER_PAGE = 10;

async function getPosts(page: number): Promise<Post[]> {
  const start = (page - 1) * POSTS_PER_PAGE;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${POSTS_PER_PAGE}`);
  return res.json();
}

export default async function Home() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1; // Página atual ou 1 por padrão

  const posts = await getPosts(currentPage);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-8">Posts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 bg-gray-800 rounded-lg hover:bg-amber-400 hover:text-slate-950 transition">
            <div className="flex items-center justify-start gap-2">
              {/* Círculo com ícone */}
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-red-600 rounded-full">
                <Play className="w-4 h-4 text-white" />
              </div>
              {/* Link com título */}
              <Link href={`/posts/${post.id}`} >
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Botões de Paginação */}
      <div className="flex justify-center mt-8 gap-2">
        <Link
          href={`/?page=${currentPage - 1}`}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
        >
          Anterior
        </Link>
        
        <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
          Próximo
        </Link>
      </div>

    </div>
  );
}