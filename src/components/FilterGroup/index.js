import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {sample = 'sample'} = props
  console.log(sample)

  const changeVal = () => {
    console.log('boxChecked')
  }

  return (
    <div className="filters-group-container">
      <div className="filters-employment-type">
        <h3 className="filters-group-title">Type of Employment</h3>

        <ul className="filters-group-list">
          {employmentTypesList.map(eachType => (
            <li className="filter-group-item" key={eachType.employmentTypeId}>
              <input type="checkbox" id="checkBox" onChange={changeVal} />

              <label className="label" htmlFor="checkBox">
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>

        <hr className="line" />

        <ul className="filters-group-list">
          {salaryRangesList.map(salaryRange => (
            <li className="filter-group-item" key={salaryRange.salaryRangeId}>
              <input type="radio" id="checkBox" onChange={changeVal} />

              <label className="label" htmlFor="checkBox">
                {salaryRange.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilterGroup
