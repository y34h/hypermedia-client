export default ({ actions, executeAction }) => (
  <div className='ct-action-list'>
    {actions.map(action => {
      return (
        <button
          className='ct-action'
          key={action.href}
          onClick={() => executeAction(action.href)}>
          {action.title}
        </button>
      )
    })}
  </div>
)
