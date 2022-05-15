export const setInitialProperties = (attributes) => {
    const initialProperties = {}
    attributes.forEach(attr => {
      initialProperties[attr.name] = attr.items[0].value
    })
    return initialProperties
  }
