import { useState, useEffect } from 'react'

function handleEducationIncrement(educationalDetails, setEducationalDetails) {
  const newObject = {
    id: self.crypto.randomUUID(),
    course: '',
    institute: '',
    year: '',
    grade: ''
  };
  const newDetails = [...educationalDetails, newObject];
  setEducationalDetails(newDetails);
}

function handleFieldChangeForEducation(field, value, currentObject, educationalDetails, setEducationalDetails) {
  currentObject[field] = value;
  const index = educationalDetails.findIndex(element => element.id === currentObject.id);
  const updatedDetails = [
    ...educationalDetails.slice(0, index),
    currentObject,
    ...educationalDetails.slice(index + 1)
  ];
  setEducationalDetails(updatedDetails);
}

function CreateEducationEntry({educationalDetails, setEducationalDetails, id}) {
  let currentObject = educationalDetails.find(element => element.id === id);
  function handleRemoveForEducation() {
    const updatedDetails = educationalDetails.filter(element => element.id !== id);
    setEducationalDetails(updatedDetails);
  }
  return(
    <div className='educationEntry'>
      <label>
        <span>Course:&nbsp;</span>
        <input type="text" value={educationalDetails.course}
        onChange={(event) => {
            handleFieldChangeForEducation('course', event.target.value, currentObject, educationalDetails, setEducationalDetails);
          }
        }/>
      </label>
      <label>
        <span>Institute:&nbsp;</span>
        <input type="text" value={educationalDetails.institute}
        onChange={(event) => {
            handleFieldChangeForEducation('institute', event.target.value, currentObject, educationalDetails, setEducationalDetails);
          }
        }/>
      </label>
      <label>
        <span>Year:&nbsp;</span>
        <input type="text" value={educationalDetails.year}
        onChange={(event) => {
            handleFieldChangeForEducation('year', event.target.value, currentObject, educationalDetails, setEducationalDetails);
          }
        }/>
      </label>
      <label>
        <span>Grade:&nbsp;</span>
        <input type="text" value={educationalDetails.grade}
        onChange={(event) => {
            handleFieldChangeForEducation('grade', event.target.value, currentObject, educationalDetails, setEducationalDetails);
          }
        }/>
      </label>
      <button className='removeButton' onClick={handleRemoveForEducation}>Remove</button>
    </div>
  )
}

function EducationEntry({ educationalDetails, setEducationalDetails }) {
  return (
  <>
    {educationalDetails.map((element) => <CreateEducationEntry key={element.id} id={element.id} educationalDetails={educationalDetails} setEducationalDetails={setEducationalDetails} /> )}
  </>)
}

function DisplaySectionListInput({ sectionList, setSectionList }) {
  return (
    <>
    {sectionList.map((section) => {
      return (
        <div key={section.id} className="section">
          <h1>
            <input type="text" value={section.title} placeholder='Add Title'
              onChange={(event) => {
                const currentObject = { ...section, title: event.target.value};
                const index = sectionList.findIndex(element => element.id === currentObject.id);
                const updatedDetails = [...sectionList.slice(0, index), currentObject, ...sectionList.slice(index + 1)];
                setSectionList(updatedDetails);
              }
            }/>
          </h1>
          <ul>
            {section.points.map(point => {
              return (<li key={point.id}>
                <input type="text" value={point.content} placeholder='Add content'
                onChange={(event) => {
                  const currentObject = { ...point, content: event.target.value}; // update this bullet point
                  const index = section.points.findIndex(element => element.id === currentObject.id); // find index of this bullet point in the array section.points

                  const updatedPointsArray = [...section.points.slice(0, index), currentObject, ...section.points.slice(index + 1)];
                  const sectionIndex = sectionList.findIndex(element => element.id === section.id)

                  const finalSectionList = [...sectionList.slice(0, sectionIndex), {...section, points: updatedPointsArray}, ...sectionList.slice(sectionIndex + 1)];

                  setSectionList(finalSectionList);
                }
              }/>
              <button className='removeBulletButton' onClick={() => {
                const index = section.points.findIndex(element => element.id === point.id); // get the index for the bullet point
                const updatedPointsArray = [...section.points.slice(0, index), ...section.points.slice(index + 1)]; // update the new points list

                const sectionIndex = sectionList.findIndex(element => element.id == section.id)

                const finalSectionList = [...sectionList.slice(0, sectionIndex), {...section, points: updatedPointsArray}, ...sectionList.slice(sectionIndex + 1)];

                setSectionList(finalSectionList);
              }}>
                <img src="/close.svg" alt="X" title='Remove Bullet Point' />
              </button>
              </li>)
            })}
            <li key={self.crypto.randomUUID()}>
              <button onClick={() => {
                const newPoints = [...(section.points), {id: self.crypto.randomUUID(), content: ''}] // add a new point to the points array
                const index = sectionList.findIndex(element => element.id === section.id); // get the index of current section in the sectionList
                const newSection = {...(sectionList[index]), points: newPoints} // newSection is going to be the spread of previous section with points: newPoints
                const finalSectionList = [...sectionList.slice(0, index), newSection, ...sectionList.slice(index + 1)];
                setSectionList(finalSectionList);
              }}> Add bullets </button>
            </li>
          </ul>
          <button className='removeSectionButton' onClick={() => {
            const index = sectionList.findIndex(element => element.id === section.id);
            const newSectionList = [...sectionList.slice(0, index), ...sectionList.slice(index + 1)];
            setSectionList(newSectionList);
          }}><img src="/close.svg" alt="X" title='Remove Section'/></button>
        </div>
      )
    })}
    </>
  )
}

const newSectionTemplate = {
  id: 0,
  title: '',
  points: []
}

function InputSection({ personalDetails, setPersonalDetails, educationalDetails, setEducationalDetails, sectionList, setSectionList }) {
  const [openSection, setOpenSection] = useState("content");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  useEffect(() => {
    document.documentElement.style.setProperty('--content-font-size', `${fontSize}px`);
  }, [fontSize]);
  useEffect(() => {
    document.documentElement.style.setProperty('--content-font-style', `${fontFamily}`);
  }, [fontFamily]);

  return (
    <div id='inputSection'>
      <div id="navigation">
        <button onClick={() => {
          setOpenSection("content");
        }}> Content </button>
        <button onClick={() => {
          setOpenSection("customise")
        }}> Customise </button>
        <button onClick={() => {window.print()}}> Download </button>
      </div>

      <div id="optionContainer">
        <div id='contentContainer' className={`${openSection === "content" ? "visible" : "invisible"} optionList`}>
          <div className='section'>
            <h1>Personal Details</h1>
            <label>
              <span>Name:&nbsp;</span>
              <input type="text" value={personalDetails.name}
              onChange={(event) => {
                  const newPersonalDetails = {...personalDetails, name: event.target.value};
                  setPersonalDetails(newPersonalDetails);
                }
              }/>
            </label>
            <label>
              <span>Phone:&nbsp;</span>
              <input type="text" value={personalDetails.phone}
              onChange={(event) => {
                  const newPersonalDetails = {...personalDetails, phone: event.target.value};
                  setPersonalDetails(newPersonalDetails);
                }
              }/>
            </label>
            <label>
              <span>Email:&nbsp;</span>
              <input type="text" value={personalDetails.email}
              onChange={(event) => {
                  const newPersonalDetails = {...personalDetails, email: event.target.value};
                  setPersonalDetails(newPersonalDetails);
                }
              }/>
            </label>
            <label>
              <span>Address:&nbsp;</span>
              <input type="text" value={personalDetails.address}
              onChange={(event) => {
                  const newPersonalDetails = {...personalDetails, address: event.target.value};
                  setPersonalDetails(newPersonalDetails);
                }
              }/>
            </label>
          </div>

          <div className="section">
            <h1>Education</h1>
            <EducationEntry educationalDetails={educationalDetails} setEducationalDetails={setEducationalDetails} />
            <button onClick={() => {
              handleEducationIncrement(educationalDetails, setEducationalDetails)
            }}> Add Fields </button>
          </div>

          <DisplaySectionListInput sectionList={sectionList} setSectionList={setSectionList} />

          <button onClick={() => {
            const newSection = [...sectionList, {...newSectionTemplate, id: self.crypto.randomUUID()}];
            setSectionList(newSection);
          }}> Add Section </button>
        </div>

        <div id='customisationContainer' className={`${openSection === "customise" ? "visible" : "invisible"} optionList`}>
        <div className='section'>
        <h1>Font Size</h1>
          <span>
            <button onClick={() => { setFontSize(fontSize + 1) }}><h1>&nbsp; A+ &nbsp;</h1></button>
            <button onClick={() => { setFontSize(fontSize - 1) }}><h1>&nbsp; A- &nbsp;</h1></button>
          </span>
        </div>
        <div className='section'>
          <h1>Font Style</h1>
            <span>
              <button onClick={() => { setFontFamily('Arial') }}>Arial</button>
              <button onClick={() => { setFontFamily('Times New Roman') }}>Times New Roman</button>
              <button onClick={() => { setFontFamily('CambriaNew') }}>Cambria</button>
            </span>
        </div>
          {/*
            idhar hoga
            1. font size change
            2. font style change
          */}
        </div>
      </div>
    </div>
  );
}

function DisplayEducationQualification({ educationalDetails }) {
  return (
    <>
      {educationalDetails.map((element) => {
        return (
          <div className='educationEntry' key={element.id}>
            <span><b>{element.course}</b> ({element.institute}, {element.year})</span>
            <span>{element.grade}</span>
          </div>
        )
      })}
    </>
  )
}

function DisplaySections({ sectionList }) {
  return (
    <>
    {sectionList.map(section => {
      return (
        <div key={section.id} className="sectionSection section">
          <h3>{section.title}</h3>
          <hr />
          <ul>
            {section.points.map(point => {
              return <li key={point.id}>{point.content}</li>
            })}
          </ul>
        </div>
      )
    })}
    </>
  )
}

function ResumeSection({ personalDetails, educationalDetails, sectionList }) {
  return (
    <div id="resumeWrapper">
      <div id="Resume">
        <div id="content">
          <div className="personalSection section">
            <h1>{personalDetails.name}</h1>
            <span>{personalDetails.phone}</span>
            &nbsp; &bull; &nbsp;
            <span>{personalDetails.email}</span>
            &nbsp; &bull; &nbsp;
            <span>{personalDetails.address}</span>
          </div>

          <div className='educationSection section'>
          {educationalDetails.length > 0 ? <><h3>Education Details</h3><hr/></> : ''}
            <DisplayEducationQualification educationalDetails={educationalDetails}/>
          </div>

          <DisplaySections sectionList={sectionList}/>
        </div>
      </div>
    </div>
  )
}

function IncompatibleAlert() {
  return (
    <div id="incompatibilityAlert">
      The app does not work for screens of the current dimensions. Please resize or use a different device.
    </div>
  )
}

function App() {
  const [sectionList, setSectionList] = useState([]);

  const [personalDetails, setPersonalDetails] = useState({
    id: self.crypto.randomUUID(),
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [educationalDetails, setEducationalDetails] = useState([]);

  return (
    <>
      <InputSection personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} educationalDetails={educationalDetails} setEducationalDetails={setEducationalDetails} sectionList={sectionList} setSectionList={setSectionList} />
      <ResumeSection personalDetails={personalDetails} educationalDetails={educationalDetails} sectionList={sectionList} />
      <IncompatibleAlert />
    </>
  )
}

export default App