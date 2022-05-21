import Catalog, { CatalogDocument } from "@catalog/models/Catalog.model"

export async function findCatalog(id: string) {
  try {
    return (await Catalog.findOne({ owner: id })) as CatalogDocument | null
  } catch (err) {
    throw new Error(err)
  }
}

export async function findCatalogByID(id: string) {
  try {
    return (await Catalog.findById(id)) as CatalogDocument | null
  } catch (err) {
    throw new Error(err)
  }
}
export async function findAllCatalogues() {
  try {
    return (await Catalog.find()) as CatalogDocument[] | []
  } catch (err) {
    throw new Error(err)
  }
}

export async function findCatalogProducts(catalog, products) {
  try {
    return (await Catalog.find({
      catalog,
      products: { $all: [...products] },
    })) as CatalogDocument[] | []
  } catch (err) {
    throw new Error(err)
  }
}
