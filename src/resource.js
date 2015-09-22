class Links {
  constructor(links, parentLinks) {
    this.actions = links.filter(link => link.rel == 'action')
    this.self = links.filter(link => link.rel == 'self')[0]
    this.update = links.filter(link => link.rel == 'update')[0]

    if (!this.update && parentLinks) {
      this.update = parentLinks.update
    }
  }
}

class Property {
  constructor(data, parent) {
    this.links = new Links(data.links, parent && parent.links)
    this.id = data.id || this.links.self.href
    this.title = data.title
    this.type = data.type
  }
}

class PrimitiveProperty extends Property {
  constructor(data, parent) {
    super(data, parent)

    this.display = data.display
    this.id = data.id
    this.options = data.options
    this.value = data.value
  }
}

class ObjectProperty extends Property {
  constructor(data, parent) {
    super(data, parent)

    this.properties = data.properties.map(property => {
      if (property.type == 'object') {
        return new ObjectProperty(property, this)
      }
      else if (property.type == 'array') {
        return new ArrayProperty(property, this)
      }

      return new PrimitiveProperty(property, this)
    })
  }
}

class ArrayProperty extends Property {
  constructor(data, parent) {
    super(data, parent)

    this.items = data.items.map(item => {
      if (item.type == 'object') {
        return new ObjectProperty(item, this)
      }
      else if (item.type == 'array') {
        return new ArrayProperty(item, this)
      }

      return new PrimitiveProperty(item, this)
    })
  }
}

export default class Resource extends ObjectProperty {
  constructor(data, parent) {
    super(data, parent)
    this.getData = () => data
  }
}
