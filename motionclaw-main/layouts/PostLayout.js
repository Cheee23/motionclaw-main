import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTop from '@/components/ScrollTop'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useEffect, useRef, useState } from 'react'

const twitterShare = (slug) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children, toc }) {
  const { slug, fileName, date, title, tags, readingTime } = frontMatter
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTop />
      <article>
        <div className="xl:divide-y  xl:divide-gray-700">
          <header className="relative pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex justify-center gap-5">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  {readingTime.words} words
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {readingTime.text}
                </span>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-700 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-700 xl:pt-11">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>

              <div className="flex justify-end gap-2 pt-6 pb-6 text-sm text-gray-300">
                <Link title="Share on Twitter" href={twitterShare(slug)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 122.88 38.48"
                    className="w-20"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M118.69 0H4.19C1.89 0 0 1.89 0 4.19V34.3c0 2.3 1.89 4.19 4.19 4.19h114.5c2.3 0 4.19-1.89 4.19-4.19V4.19c0-2.3-1.89-4.19-4.19-4.19z"
                      className="st1"
                      fill="#1DA1F2"
                    ></path>
                    <path
                      d="M51.99 21.34l3.13-.23c.07.59.21 1.04.42 1.34.34.5.82.75 1.46.75.47 0 .83-.13 1.09-.38.26-.26.38-.55.38-.89 0-.32-.12-.61-.36-.86s-.8-.49-1.68-.72c-1.45-.37-2.47-.88-3.09-1.5-.62-.62-.93-1.42-.93-2.39 0-.63.16-1.23.48-1.8.32-.57.79-1.01 1.43-1.34.64-.32 1.51-.48 2.62-.48 1.36 0 2.4.29 3.12.89.72.59 1.14 1.53 1.28 2.81l-3.1.21c-.08-.56-.26-.97-.52-1.23-.27-.26-.63-.38-1.1-.38-.38 0-.67.1-.87.28s-.29.42-.29.69c0 .2.08.37.24.53.15.16.52.31 1.1.46 1.44.36 2.47.73 3.09 1.1.62.37 1.08.82 1.36 1.37.28.54.42 1.16.42 1.83a4.4 4.4 0 01-.57 2.2c-.38.67-.91 1.18-1.59 1.53-.68.35-1.53.52-2.57.52-1.81 0-3.07-.41-3.77-1.22-.69-.81-1.09-1.84-1.18-3.09zm-20.98-8.43c-.75.34-1.56.56-2.4.66.86-.52 1.53-1.34 1.84-2.32-.81.48-1.71.83-2.66 1.02a4.203 4.203 0 00-3.06-1.32 4.189 4.189 0 00-4.08 5.14c-3.48-.18-6.57-1.84-8.63-4.38-.37.64-.57 1.37-.57 2.11 0 1.45.74 2.74 1.86 3.48-.69-.02-1.33-.21-1.9-.52v.05c0 2.03 1.44 3.72 3.36 4.11-.35.1-.72.15-1.1.15-.27 0-.53-.03-.79-.07a4.214 4.214 0 003.91 2.91 8.375 8.375 0 01-5.2 1.79c-.34 0-.67-.02-1-.06 1.86 1.19 4.06 1.88 6.42 1.88 7.7 0 11.92-6.38 11.92-11.92 0-.18 0-.36-.01-.54.82-.59 1.53-1.33 2.09-2.17zm32.12.14h3.29v4.33h3.61v-4.33h3.31v12.39h-3.31v-5.02h-3.61v5.02h-3.29V13.05zM82.1 23.39h-3.74l-.54 2.04h-3.37l4.02-12.39h3.61l4 12.39h-3.45l-.53-2.04zm-.69-2.68l-1.17-4.45-1.17 4.45h2.34zm5.77 4.73V13.05h5.5c1.02 0 1.8.1 2.33.31.54.2.98.58 1.3 1.13.33.55.5 1.22.5 2.01 0 .69-.13 1.28-.38 1.78s-.6.91-1.04 1.22c-.28.2-.67.36-1.16.49.39.15.68.3.86.46.12.1.3.32.53.65.23.33.38.59.46.77l1.6 3.58h-3.73l-1.76-3.78c-.23-.49-.42-.81-.6-.95-.24-.19-.51-.29-.81-.29h-.29v5.02h-3.31v-.01zm3.31-7.36h1.39c.15 0 .44-.06.88-.17.22-.05.4-.18.53-.39.14-.21.21-.45.21-.72 0-.4-.11-.71-.33-.92-.22-.21-.63-.32-1.23-.32h-1.45v2.52zm8.25-5.03h8.83v2.65h-5.52v1.97h5.11v2.53h-5.11v2.44h5.68v2.8h-8.99V13.05z"
                      className="st2"
                      fill="white"
                    ></path>
                    <path
                      d="M40.66 0L40.66 38.48 38.27 38.48 38.27 0 40.66 0z"
                      className="st0"
                      fill="#1A91DA"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
            <footer>
              <div className="divide-gray-700 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-400">Tags</h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="sticky top-0 pt-4 xl:pt-8">
                <Link href="/posts" className="text-primary-500 hover:text-primary-400">
                  &larr; Back to the Graphic Design
                </Link>
                <div className="hidden md:block">
                  <TocComponent toc={toc} />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

function TocComponent({ toc }) {
  const [activeId, setActiveId] = useState()
  useIntersectionObserver(setActiveId)
  const [TOC, setTOC] = useState([])
  useEffect(() => {
    let etoc = toc.map((e) => ({ ...e, children: [] }))
    for (let i = etoc.length - 1; i >= 0; i--) {
      if (etoc[i].depth == 1) continue
      for (let j = i; j >= 0; j--) {
        if (etoc[i].depth - etoc[j].depth == 1) {
          etoc[j].children.unshift(etoc[i])
          break
        }
      }
    }
    setTOC(etoc.filter((e) => e.depth == 1))
  }, [toc])

  let RenderToc = ({ item, activeId }) => {
    const isActive = (e) => {
      if ('#' + activeId === e.url) return true
      for (let i of e.children) if (isActive(i)) return true
      return false
    }
    return item.map((e, i) => (
      <div key={i}>
        <Link href={e.url}>
          <p
            className={`border-l-[3px] pl-2 ${
              isActive(e) && 'border-primary-500 text-primary-600'
            }`}
          >
            {e.value}
          </p>
        </Link>
        {isActive(e) && e.children.length > 0 && (
          <div className="mt-1 ml-4 space-y-1">
            <RenderToc item={e.children} activeId={activeId} />
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="mt-5 space-y-1 text-sm">
      <RenderToc item={TOC} activeId={activeId} />
    </div>
  )
}

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({})
  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id) => headingElements.findIndex((heading) => heading.id === id)

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}
