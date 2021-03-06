import cx from 'classnames'
import factory from './factory'

export default ({ navigate, property, topLevel, update }) => (
  <div className={cx({'nested': !topLevel}, 'ct-section')}>
    {property.properties.map(property => {
      const Element = factory(property)

      return (
        <div className='ct-element' key={property.id}>
          <label className='ct-element-label'>
            {property.title}
          </label>
          <Element
            navigate={navigate}
            property={property}
            update={update} />
        </div>
      )
    })}
  </div>
)
