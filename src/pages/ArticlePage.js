import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";
import { marked } from "marked";
import { Helmet } from "react-helmet";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticle(id).then((data) => setArticle(data));
  }, [id]);

  if (!article) return <div className="text-center my-10">Loading...</div>;

  const handleShareFacebook = () => {
    // Logic to share on Facebook
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  const handleShareLine = () => {
    // Logic to share on LINE
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  const handleShareX = () => {
    // Logic to share on X
    window.open(
      `https://www.x.com/share?url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  const getImageUrlFromContent = (content) => {
    // Regular expression to match Markdown image syntax
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = content.match(regex);
    
    // If a match is found, return the URL (first capturing group)
    if (match) {
      return match[1];
    }
    
    // If no match is found, return an empty string or null
    return null;
  }

  function cleanMarkdownTags(content) {
    // Remove headers
    content = content.replace(/(#+\s*)/g, '');
    // Remove images
    content = content.replace(/!\[.*?\]\(.*?\)/g, '');
    // Remove links
    content = content.replace(/\[.*?\]\(.*?\)/g, '');
    // Remove bold and italics
    content = content.replace(/(\*\*|__)(.*?)\1/g, '$2');
    content = content.replace(/(\*|_)(.*?)\1/g, '$2');
    // Remove blockquotes
    content = content.replace(/>\s?/g, '');
    // Remove inline code and code blocks
    content = content.replace(/(```\s*.*?\s*```)|(`.*?`)/gs, '');
    // Remove unordered list items
    content = content.replace(/^\s*[-*+]\s*/gm, '');
    // Remove ordered list items
    content = content.replace(/^\s*\d+\.\s*/gm, '');
    // Optional: Remove additional Markdown elements as needed
  
    return content;
  }

  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(cleanMarkdownTags(article.content));
    utterance.lang = 'th-TH';
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={ cleanMarkdownTags(article.content.substring(0, 100)) } />
        <meta name="keywords" content={article.tags} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={ cleanMarkdownTags(article.content.substring(0, 100)) } />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={getImageUrlFromContent(article.content)} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content="Apinan Woratrakun (iamapinan)" />

        <meta name="twitter:card" content={getImageUrlFromContent(article.content)}/>
        <meta property="twitter:domain" content="iamapinan.com"/>
        <meta property="twitter:url" content={window.location.href}/>
        <meta name="twitter:title" content={article.title}/>
        <meta name="twitter:description" content={ cleanMarkdownTags(article.content.substring(0, 100)) }/>
        <meta name="twitter:image" content={getImageUrlFromContent(article.content)}/>
        
      </Helmet>
      <div className="px-4 mx-auto max-w-2xl ">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <p className="text-gray-600 mt-4">Category: {article.categories} @ 
          {new Date(article.date).toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <div className="mt-4 justify-end w-full">
          <button
            className="bg-gray-800 text-white px-2 py-2 text-sm rounded ml-2 flex flex-row gap-2 items-center"
            onClick={handleTextToSpeech}
          >
            อ่านให้ฟัง
          </button>
        </div>
        <div className="mt-4">
          <div
            dangerouslySetInnerHTML={{ __html: marked(article.content) }}
            className="leading-8 article-content"
          />
        </div>
        <div className="my-8 gap-1 flex flex-row flex-wrap">
          <button
            className="bg-blue-500 text-white text-sm px-2 py-2 rounded flex flex-row gap-2 items-center"
            onClick={handleShareFacebook}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z"></path>
                </g>
              </g>
            </svg>
            Facebook
          </button>
          <button
            className="bg-green-500 text-white px-2 py-2 text-sm rounded ml-2 flex flex-row gap-2 items-center"
            onClick={handleShareLine}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M9,4c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM25,11c8.27,0 15,5.35922 15,11.94922c0,2.63 -1.0407,5.01156 -3.2207,7.35156c-1.57,1.78 -4.11875,3.73938 -6.46875,5.35938c-2.35,1.6 -4.51055,2.85945 -5.31055,3.18945c-0.32,0.13 -0.56,0.18945 -0.75,0.18945c-0.66,0 -0.60078,-0.69828 -0.55078,-0.98828c0.04,-0.22 0.2207,-1.26172 0.2207,-1.26172c0.05,-0.37 0.09922,-0.95813 -0.05078,-1.32812c-0.17,-0.41 -0.84008,-0.6207 -1.33008,-0.7207c-7.2,-0.94 -12.53906,-5.89101 -12.53906,-11.79102c0,-6.59 6.73,-11.94922 15,-11.94922zM23.99219,18.99805c-0.50381,0.00935 -0.99219,0.39383 -0.99219,1.00195v6c0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1v-2.87891l2.18555,3.45898c0.566,0.792 1.81445,0.39292 1.81445,-0.58008v-6c0,-0.552 -0.448,-1 -1,-1c-0.552,0 -1,0.448 -1,1v3l-2.18555,-3.58008c-0.21225,-0.297 -0.51998,-0.42748 -0.82227,-0.42187zM15,19c-0.552,0 -1,0.448 -1,1v6c0,0.552 0.448,1 1,1h3c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1h-2v-5c0,-0.552 -0.448,-1 -1,-1zM21,19c-0.552,0 -1,0.448 -1,1v6c0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1v-6c0,-0.552 -0.448,-1 -1,-1zM31,19c-0.552,0 -1,0.448 -1,1v6c0,0.552 0.448,1 1,1h3c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1h-2v-1h2c0.553,0 1,-0.448 1,-1c0,-0.552 -0.447,-1 -1,-1h-2v-1h2c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1z"></path>
                </g>
              </g>
            </svg>
            LINE
          </button>
          <button
            className="bg-blue-400 text-white px-2 py-2 text-sm rounded ml-2 flex flex-row gap-2 items-center"
            onClick={handleShareX}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M6.91992,6l14.2168,20.72656l-14.9082,17.27344h3.17773l13.13867,-15.22266l10.44141,15.22266h10.01367l-14.87695,-21.6875l14.08008,-16.3125h-3.17578l-12.31055,14.26172l-9.7832,-14.26172z"></path>
                </g>
              </g>
            </svg>
            X
          </button>
          <button
            className="bg-gray-800 text-white px-2 py-2 text-sm rounded ml-2 flex flex-row gap-2 items-center"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            URL
          </button>
        </div>
      </div>
    </main>
  );
};

export default ArticlePage;
