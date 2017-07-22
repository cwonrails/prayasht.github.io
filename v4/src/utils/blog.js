export function getBreadCrumb(path) {
  let breadcrumb = path.substr(1, path.length - 2)

  if (breadcrumb.includes('blog/')) {
    breadcrumb = breadcrumb.split('/').slice(0, -1).join('')
  }

  return breadcrumb
}
