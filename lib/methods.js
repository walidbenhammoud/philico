Meteor.methods({
  addimage: function (theemail, imagesURL, id) {
    Personalinfo.update(
      { _id: Personalinfo.findOne({ createdBy: theemail })._id},
      { $set: imagesURL})
    Images.update(
      { _id: id},
      { $set: 
        { owner: theemail } 
      })
  },

  showDetails: function(theemail, displayornotphoto, displayornotaddress, displayornotcontact) {
    if (displayornotphoto==="yes") {resultphoto=true} else {resultphoto=false};
    if (displayornotaddress==="yes") {resultaddress=true} else {resultaddress=false};
    if (displayornotcontact==="yes") {resultcontact=true} else {resultcontact=false};
    Personalinfo.update(Personalinfo.findOne({ createdBy: theemail })._id,
      { $set: 
        { displayPhoto: resultphoto,
          displayPhotovar: displayornotphoto,
          displayAddress: resultaddress,
          displayAddressvar: displayornotaddress,
          displayContact: resultcontact,
          displayContactvar: displayornotcontact}
      })
  },

  init: function(theId, given_name, family_name, email, subcontractor) {
    if (Personalinfo.find({createdBy:theId}).count()==0) {
    Personalinfo.insert({
      displayPhoto:true,
      displayPhotovar:"yes",
      displayAddress:true,
      displayAddressvar:"yes",
      displayContact:true,
      displayContactvar:"yes",
      subcontractor: subcontractor,
      createdBy: theId,
      firstName: given_name,
      firstNameup: given_name.toUpperCase(),
      familyName: family_name,
      familyNameup: family_name.toUpperCase(),
      fullName: given_name+' '+family_name,
      email: email,
      sourcetaxed: "?",
      emailSignature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div><b><span style="color:#004a8d">'+given_name+' '+family_name+'<br></span></b></div><div><span style="color:red">Missing phone number</span></div><br><div><a href="tel:+" target="_blank"><span style="color:red">Missing position</span></a></div><div><a href="mailto:'+email+'" target="_blank">'+email+'</a></div><br><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div>',
      assessment: [{
          _id: (new Date()).getTime(),
          fullName: given_name+' '+family_name,
          email: email,
      }],
      assessmentfinals: new Array(),
      });
  };
  },
  
  addPersonalinfo: function(firstName, familyName, email, addressStreet, addressNumber, addressZip, addressCity, addressCountry, nationality1, nationality2, nationality3,
     sourcetaxed, domicilecountryCode, domicilePhone, mobilecountryCode, mobilePhone, birthDate, ahvNumber, startDatephilico, positionPhilico, marriageDate, spousefamilyName, spousefirstName, child1Name, child1Birthdate, child2Name, child2Birthdate,
     child3Name, child3Birthdate, emergency1firstName, emergency1familyName, emergency1Relation, emergency1Phone, emergency2firstName, emergency2familyName, emergency2Relation, emergency2Phone, CHbankName, CHbankCity, CHbankZip, CHbankIban,
     CHbankAccountnumber, CHbankAccountname, EURbankName, EURbankCity, EURbankZip, EURbankIban, EURbankAccountnumber, EURbankAccountname, creator) {
    var signatureteltest="";
    if (mobilePhone.toString().length===0) {signteltest=""} else {signteltest="+" + mobilecountryCode + mobilePhone};
    if (signteltest==="") {signatureteltest='<span style="color:red">Missing phone number</span>'} else {signatureteltest="<span>"+signteltest+"</span>"};
    var positionPhilicotest="";
    if (positionPhilico.length===0){positionPhilicotest='<span style="color:red">Missing position</span>'} else {positionPhilicotest="<span>"+positionPhilico+"</span>"};
    Personalinfo.update(Personalinfo.findOne({ createdBy: email })._id,
      { $set: 
        {
     firstName: firstName,
     firstNameup: firstName.toUpperCase(),
     familyName: familyName,
     familyNameup: familyName.toUpperCase(),
     fullName: firstName+' '+familyName,
     email: email,
     addressStreet: addressStreet,
     addressNumber: addressNumber,
     addressZip: addressZip,
     addressCity: addressCity.charAt(0).toUpperCase() + addressCity.slice(1).toLowerCase(),
     addressCountry: addressCountry.charAt(0).toUpperCase() + addressCountry.slice(1).toLowerCase(),
     nationality1: nationality1,
     nationality2: nationality2,
     nationality3: nationality3,
     sourcetaxed: sourcetaxed,
     domicilecountryCode: "+"+domicilecountryCode,
     domicilePhone: domicilePhone,
     mobilecountryCode: "+"+mobilecountryCode,
     mobilePhone: mobilePhone,
     signatureTel: signatureteltest,
     birthDate: birthDate,
     birthDatedisplayed: moment(birthDate).format("MMMM Do, YYYY"), 
     ahvNumber: ahvNumber,
     startDatephilico: startDatephilico,
     startDatephilicodisplayed: moment(startDatephilico).format("MMMM Do, YYYY"),
     positionPhilico: positionPhilico,
     marriageDate: marriageDate,
     spousefamilyName: spousefamilyName,
     spousefirstName: spousefirstName,
     child1Name: child1Name,
     child1Birthdate: child1Birthdate,
     child2Name: child2Name,
     child2Birthdate: child2Birthdate,
     child3Name: child3Name,
     child3Birthdate: child3Birthdate,
     emergency1firstName: emergency1firstName,
     emergency1familyName: emergency1familyName,
     emergency1Relation: emergency1Relation,
     emergency1Phone: emergency1Phone,
     emergency2firstName: emergency2firstName,
     emergency2familyName: emergency2familyName,
     emergency2Relation: emergency2Relation,
     emergency2Phone: emergency2Phone,
     CHbankName: CHbankName,
     CHbankCity: CHbankCity,
     CHbankZip: CHbankZip,
     CHbankIban: CHbankIban,
     CHbankAccountnumber: CHbankAccountnumber,
     CHbankAccountname: CHbankAccountname,
     EURbankName: EURbankName,
     EURbankCity: EURbankCity,
     EURbankZip: EURbankZip,
     EURbankIban: EURbankIban,
     EURbankAccountnumber: EURbankAccountnumber,
     EURbankAccountname: EURbankAccountname,
     emailSignature: '<div class="gmail_signature" style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px"><div><b><span style="color:#004a8d">'+firstName+' '+familyName+'<br></span></b></div><div>'+ positionPhilicotest +'</div><br><div><a href="tel:' + '+' + mobilecountryCode + mobilePhone + '" target="_blank">' + signatureteltest +'</a></div><div><a href="mailto:'+email+'" target="_blank">'+email+'</a></div><br><div><span>Philico AG</span></div><div><span>Sonder 16</span></div><div><span>CH-9042 Speicher</span></div><div><span><a href="http://www.philico.com" target="_blank">www.philico.com</a></span></div></div>',
     createdAt: new Date(),
     }    
    })
  },

  addCompetency: function(communicationSkills, businessSkills, technicalSkills, creator) {
  Personalinfo.update(
    {_id: Personalinfo.findOne({ createdBy: creator })._id },
    { $pull: { competencies: {} } },
    { multi: true }
    );

    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: 
      {competencies: {
        $each: [{
          communicationSkills: communicationSkills,
          businessSkills: businessSkills,
          technicalSkills: technicalSkills,
          communicationSkillsHTML: communicationSkills.replace(/\r?\n/g, '<br />'),
          businessSkillsHTML: businessSkills.replace(/\r?\n/g, '<br />'),
          technicalSkillsHTML: technicalSkills.replace(/\r?\n/g, '<br />')}]}
      } 
    })
  },

  addExperience: function(projectCompany, projectStartdatemonth, projectStartdateyear, projectStartdate, projectEnddate, projectClient, projectClientcity, projectClientcountry, projectClientdepartment, projectTitle, projectDescription, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      experiences: {
        $each: [{
        _id: (new Date()).getTime(),
        projectCompany: projectCompany,
        projectStartdatemonth: projectStartdatemonth,
        projectStartdateyear: projectStartdateyear,
        projectStartdate: projectStartdate, 
        projectEnddate: projectEnddate, 
        projectClient: projectClient,
        projectClientcity: projectClientcity,
        projectClientcountry: projectClientcountry,
        projectClientdepartment: projectClientdepartment, 
        projectTitle: projectTitle,  
        projectDescription: projectDescription, 
        projectDescriptionHTML: projectDescription.replace(/\r?\n/g, '<br />')}],
        $sort: { projectStartdateyear: -1 , projectStartdatemonth: -1 },
        $slice: -50
        } 
      }
      }
    )   
  },

  deleteExperience: function(id) {
    Personalinfo.update(
    { },
    { $pull: { experiences: { _id : id } } },
    { multi: true }
    );
  },

  addEmployment: function(employmentStartdatemonth, employmentStartdateyear, employmentStartdate, employmentEnddate, employmentCompany, employmentCity, employmentCountry, employmentPosition, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      employments: {
        $each: [{
        _id: (new Date()).getTime(),   
        employmentStartdatemonth: employmentStartdatemonth,
        employmentStartdateyear: employmentStartdateyear,
        employmentStartdate: employmentStartdate,
        employmentEnddate: employmentEnddate,
        employmentCompany: employmentCompany,
        employmentCity: employmentCity,
        employmentCountry, employmentCountry,
        employmentPosition: employmentPosition,
        employmentPositionHTML: employmentPosition.replace(/\r?\n/g, '<br />')}],
        $sort: { employmentStartdateyear: -1, employmentStartdatemonth: -1},
        $slice: -50
       } 
      }
      })   
  },

  deleteEmployment: function(id) {
    Personalinfo.update(
    { },
    { $pull: { employments: { _id : id } } },
    { multi: true }
    );
  },
  
  addDegree: function(degreeDatemonth, degreeDateyear, degreeDate, degree, degreeSpecialisation, degreeUniversity, degreeCity, degreeCountry, creator) {
       Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      degrees: {
        $each: [{
        _id: (new Date()).getTime(),   
        degreeDatemonth: degreeDatemonth,
        degreeDateyear: degreeDateyear,
        degreeDate: degreeDate,
        degree: degree,
        degreeSpecialisation: degreeSpecialisation,
        degreeUniversity: degreeUniversity,
        degreeCity: degreeCity,
        degreeCountry: degreeCountry}],
        $sort: { degreeDateyear: -1 , degreeDatemonth: -1 },
        $slice: -50
       } 
      }
      })   
  },

  deleteDegree: function(id) {
    Personalinfo.update(
    { },
    { $pull: { degrees: { _id : id } } },
    { multi: true }
    );
  },

  addLanguage: function(languageItem, languageSkill, creator) {
    Personalinfo.update(Personalinfo.findOne({ createdBy: creator })._id,
    { $push: {
      languages: {
        $each: [{
        _id: (new Date()).getTime(),
        languageItem: languageItem,
        languageSkill: languageSkill}],
      } 
    } 
    })
  },

  deleteLanguage: function(id) {
    Personalinfo.update( 
    { },
    { $pull: { languages: { _id : id} } },
    { multi: true }
    );
  },

  addInterimAssessment: function(fullName, positionPhilico, coachName, projectName, objectivesDate, objectivesWith, positionDifficulty, manDays, assessmentFrom,
      assessmentTo, assessmentDate, assessmentBy, assessmentType, pcpClient, pcpEducation, pcpInternal, projectDescription, projectIndividualRole,
      projectObjectives, overallSelfEvaluation, overallCoachstrengths, overallCoachweaknesses, overallPerformanceRating, consultingSelfEvaluation, 
      consultingCoachstrengths, consultingCoachweaknesses, consultingclientcentricityrating, consultingnegotiationrating, consultingmethodologyrating, 
      consultinganalyticalrating, consultingmanagementrating, technicalSelfEvaluation, technicalCoachstrengths, technicalCoachweaknesses, 
      technicalbroadavaloqrating, technicaldeepavaloqrating, technicalskillsrating, technicalobjectmodellingrating, functionalSelfEvaluation, 
      functionalCoachstrengths, functionalCoachweaknesses, functionalbroadbankingrating, functionalspecificbankingrating, 
      functionalexperiencerating, functionalmarketrating, softSelfEvaluation, softCoachstrengths, softCoachweaknesses, softsocialrating, 
      softleadershiprating, softseniorityrating, softpressurerating, finalRating, email, id) {

  Personalinfo.update(
    {_id: id },
    { $pull: { assessment: {} } },
    { multi: true }
    );
  Personalinfo.update(id,
    { $push: {
      assessment: {
        $each: [{
          _id: (new Date()).getTime(),
          fullName: fullName,
          email:email,
          positionPhilico: positionPhilico,
          coachName : coachName,
          projectName : projectName,
          objectivesDate : objectivesDate,
          objectivesWith : objectivesWith,
          positionDifficulty : positionDifficulty,
          manDays : manDays,
          assessmentFrom : assessmentFrom,
          assessmentTo : assessmentTo,
          assessmentDate : assessmentDate,
          assessmentBy : assessmentBy,
          assessmentType : assessmentType,
          pcpClient : pcpClient,
          pcpEducation : pcpEducation,
          pcpInternal : pcpInternal,
          projectDescription : projectDescription,
          projectIndividualRole : projectIndividualRole,
          projectObjectives : projectObjectives,
          overallSelfEvaluation : overallSelfEvaluation,
          overallCoachstrengths : overallCoachstrengths,
          overallCoachweaknesses : overallCoachweaknesses,
          overallPerformanceRating : overallPerformanceRating,
          consultingSelfEvaluation : consultingSelfEvaluation,
          consultingCoachstrengths : consultingCoachstrengths,
          consultingCoachweaknesses : consultingCoachweaknesses,
          consultingclientcentricityrating : consultingclientcentricityrating,
          consultingnegotiationrating : consultingnegotiationrating,
          consultingmethodologyrating : consultingmethodologyrating,
          consultinganalyticalrating : consultinganalyticalrating,
          consultingmanagementrating : consultingmanagementrating,
          technicalSelfEvaluation : technicalSelfEvaluation,
          technicalCoachstrengths : technicalCoachstrengths,
          technicalCoachweaknesses : technicalCoachweaknesses,
          technicalbroadavaloqrating : technicalbroadavaloqrating,
          technicaldeepavaloqrating : technicaldeepavaloqrating,
          technicalskillsrating : technicalskillsrating,
          technicalobjectmodellingrating : technicalobjectmodellingrating,
          functionalSelfEvaluation : functionalSelfEvaluation,
          functionalCoachstrengths : functionalCoachstrengths,
          functionalCoachweaknesses : functionalCoachweaknesses,
          functionalbroadbankingrating : functionalbroadbankingrating,
          functionalspecificbankingrating : functionalspecificbankingrating,
          functionalexperiencerating : functionalexperiencerating,
          functionalmarketrating : functionalmarketrating,
          softSelfEvaluation : softSelfEvaluation,
          softCoachstrengths : softCoachstrengths,
          softCoachweaknesses : softCoachweaknesses,

          pcpClientHTML : pcpClient.replace(/\r?\n/g, '<br />'),
          pcpEducationHTML : pcpEducation.replace(/\r?\n/g, '<br />'),
          pcpInternalHTML : pcpInternal.replace(/\r?\n/g, '<br />'),
          projectDescriptionHTML : projectDescription.replace(/\r?\n/g, '<br />'),
          projectIndividualRoleHTML : projectIndividualRole.replace(/\r?\n/g, '<br />'),
          projectObjectivesHTML : projectObjectives.replace(/\r?\n/g, '<br />'),
          overallSelfEvaluationHTML : overallSelfEvaluation.replace(/\r?\n/g, '<br />'),
          overallCoachstrengthsHTML : overallCoachstrengths.replace(/\r?\n/g, '<br />'),
          overallCoachweaknessesHTML : overallCoachweaknesses.replace(/\r?\n/g, '<br />'),
          consultingSelfEvaluationHTML : consultingSelfEvaluation.replace(/\r?\n/g, '<br />'),
          consultingCoachstrengthsHTML : consultingCoachstrengths.replace(/\r?\n/g, '<br />'),
          consultingCoachweaknessesHTML : consultingCoachweaknesses.replace(/\r?\n/g, '<br />'),
          technicalSelfEvaluationHTML : technicalSelfEvaluation.replace(/\r?\n/g, '<br />'),
          technicalCoachstrengthsHTML : technicalCoachstrengths.replace(/\r?\n/g, '<br />'),
          technicalCoachweaknessesHTML : technicalCoachweaknesses.replace(/\r?\n/g, '<br />'),
          functionalSelfEvaluationHTML : functionalSelfEvaluation.replace(/\r?\n/g, '<br />'),
          functionalCoachstrengthsHTML : functionalCoachstrengths.replace(/\r?\n/g, '<br />'),
          functionalCoachweaknessesHTML : functionalCoachweaknesses.replace(/\r?\n/g, '<br />'),
          softSelfEvaluationHTML : softSelfEvaluation.replace(/\r?\n/g, '<br />'),
          softCoachstrengthsHTML : softCoachstrengths.replace(/\r?\n/g, '<br />'),
          softCoachweaknessesHTML : softCoachweaknesses.replace(/\r?\n/g, '<br />'),

          softsocialrating : softsocialrating,
          softleadershiprating : softleadershiprating,
          softseniorityrating : softseniorityrating,
          softpressurerating : softpressurerating,
          finalRating : finalRating,
          createdAt: new Date(),
        }],
    }
    } 
    })
  },

  addNewVersion: function (email) {
  Personalinfo.update(Personalinfo.findOne({ createdBy: email })._id,
    { $push: {
      assessmentfinals: {
        $each: [{
          _id: (new Date()).getTime(),
          createdAt: new Date(),
          fullName: Personalinfo.findOne({ createdBy: email }).assessment[0].fullName,
          positionPhilico: Personalinfo.findOne({ createdBy: email }).assessment[0].positionPhilico,
          coachName : Personalinfo.findOne({ createdBy: email }).assessment[0].coachName,
          projectName : Personalinfo.findOne({ createdBy: email }).assessment[0].projectName,
          objectivesDate : Personalinfo.findOne({ createdBy: email }).assessment[0].objectivesDate,
          objectivesWith : Personalinfo.findOne({ createdBy: email }).assessment[0].objectivesWith,
          positionDifficulty : Personalinfo.findOne({ createdBy: email }).assessment[0].positionDifficulty,
          manDays : Personalinfo.findOne({ createdBy: email }).assessment[0].manDays,
          assessmentFrom : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentFrom,
          assessmentTo : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentTo,
          assessmentDate : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentDate,
          assessmentBy : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentBy,
          assessmentType : Personalinfo.findOne({ createdBy: email }).assessment[0].assessmentType,
          pcpClient : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpClient,
          pcpEducation : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpEducation,
          pcpInternal : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpInternal,
          projectDescription : Personalinfo.findOne({ createdBy: email }).assessment[0].projectDescription,
          projectIndividualRole : Personalinfo.findOne({ createdBy: email }).assessment[0].projectIndividualRole,
          projectObjectives : Personalinfo.findOne({ createdBy: email }).assessment[0].projectObjectives,
          overallSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].overallSelfEvaluation,
          overallCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].overallCoachstrengths,
          overallCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].overallCoachweaknesses,
          overallPerformanceRating : Personalinfo.findOne({ createdBy: email }).assessment[0].overallPerformanceRating,
          consultingSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingSelfEvaluation,
          consultingCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingCoachstrengths,
          consultingCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingCoachweaknesses,
          consultingclientcentricityrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingclientcentricityrating,
          consultingnegotiationrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingnegotiationrating,
          consultingmethodologyrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingmethodologyrating,
          consultinganalyticalrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultinganalyticalrating,
          consultingmanagementrating : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingmanagementrating,
          technicalSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalSelfEvaluation,
          technicalCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalCoachstrengths,
          technicalCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalCoachweaknesses,
          technicalbroadavaloqrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalbroadavaloqrating,
          technicaldeepavaloqrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicaldeepavaloqrating,
          technicalskillsrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalskillsrating,
          technicalobjectmodellingrating : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalobjectmodellingrating,
          functionalSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalSelfEvaluation,
          functionalCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalCoachstrengths,
          functionalCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalCoachweaknesses,
          functionalbroadbankingrating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalbroadbankingrating,
          functionalspecificbankingrating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalspecificbankingrating,
          functionalexperiencerating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalexperiencerating,
          functionalmarketrating : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalmarketrating,
          softSelfEvaluation : Personalinfo.findOne({ createdBy: email }).assessment[0].softSelfEvaluation,
          softCoachstrengths : Personalinfo.findOne({ createdBy: email }).assessment[0].softCoachstrengths,
          softCoachweaknesses : Personalinfo.findOne({ createdBy: email }).assessment[0].softCoachweaknesses,
          softsocialrating : Personalinfo.findOne({ createdBy: email }).assessment[0].softsocialrating,
          softleadershiprating : Personalinfo.findOne({ createdBy: email }).assessment[0].softleadershiprating,
          softseniorityrating : Personalinfo.findOne({ createdBy: email }).assessment[0].softseniorityrating,
          softpressurerating : Personalinfo.findOne({ createdBy: email }).assessment[0].softpressurerating,
          finalRating : Personalinfo.findOne({ createdBy: email }).assessment[0].finalRating,
          finalinterimDate : Personalinfo.findOne({ createdBy: email }).assessment[0].createdAt,

          pcpClientHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpClientHTML,
          pcpEducationHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpEducationHTML,
          pcpInternalHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].pcpInternalHTML,
          projectDescriptionHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].projectDescriptionHTML,
          projectIndividualRoleHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].projectIndividualRoleHTML,
          projectObjectivesHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].projectObjectivesHTML,
          overallSelfEvaluationHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].overallSelfEvaluationHTML,
          overallCoachstrengthsHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].overallCoachstrengthsHTML,
          overallCoachweaknessesHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].overallCoachweaknessesHTML,
          consultingSelfEvaluationHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingSelfEvaluationHTML,
          consultingCoachstrengthsHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingCoachstrengthsHTML,
          consultingCoachweaknessesHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].consultingCoachweaknessesHTML,
          technicalSelfEvaluationHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalSelfEvaluationHTML,
          technicalCoachstrengthsHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalCoachstrengthsHTML,
          technicalCoachweaknessesHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].technicalCoachweaknessesHTML,
          functionalSelfEvaluationHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalSelfEvaluationHTML,
          functionalCoachstrengthsHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalCoachstrengthsHTML,
          functionalCoachweaknessesHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].functionalCoachweaknessesHTML,
          softSelfEvaluationHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].softSelfEvaluationHTML,
          softCoachstrengthsHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].softCoachstrengthsHTML,
          softCoachweaknessesHTML : Personalinfo.findOne({ createdBy: email }).assessment[0].softCoachweaknessesHTML,
        }],
    }
    } 
    })
  },
});