# Produced by Velocity Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-

"""!
Project   : ISIS
Component : GPCC
@file     : ihmLauncherConfig.py
@author   : isis
@date     : 
@brief    :
@type     : Class

"""

# ====================================================================
# Start of user code HistoryZone
# HISTORY
# 
# VERSION : 1.1.2 : FA : #7472 : 01/09/2017 : Update javascript VIMA launcher to used iedit and
#  manage the features it launch, remove the old launcher
# END-HISTORY
# End of user code HistoryZone
# ====================================================================

"""
**********************************************************************
 Module IhmLauncherConfig
**********************************************************************

Contain class IhmLauncherConfig
"""

from GPCC.xmlRuntime.core.xmlcomplexobject import XMLComplexObject
import GPCC.xmlRuntime.exceptions.xmlexceptions as xmlexceptions 

from GPCC.xmlRuntime.types.XMLBool import XMLBool    
from GPCC.xmlRuntime.types.XMLString import XMLString    


class IhmLauncherConfig(XMLComplexObject):
    """
    ======================================================================
    Class IhmLauncherConfig
    ======================================================================

    Class generated by xmlGenerator

    .. sealso : XMLComplexObject
    """


    def __init__(self):
        """
        Constructor for IhmLauncherConfig
        """
        super().__init__(**{"debug":
                            (self.create_xmldebug, 
                             self.set_xmldebug,
                             self.setFileLine_xmldebug ),
                            "fmdRoot":
                            (self.create_xmlfmdRoot, 
                             self.set_xmlfmdRoot,
                             self.setFileLine_xmlfmdRoot ),
                            "nodePath":
                            (self.create_xmlnodePath, 
                             self.set_xmlnodePath,
                             self.setFileLine_xmlnodePath ),
                            "dcPushUri":
                            (self.create_xmldcPushUri, 
                             self.set_xmldcPushUri,
                             self.setFileLine_xmldcPushUri ),
                            "dcPullUri":
                            (self.create_xmldcPullUri, 
                             self.set_xmldcPullUri,
                             self.setFileLine_xmldcPullUri ),
                            "dcConfFile":
                            (self.create_xmldcConfFile, 
                             self.set_xmldcConfFile,
                             self.setFileLine_xmldcConfFile ),
                            "additionalArg" : 
                            (self.create_xmladditionalArg, 
                             self.set_xmladditionalArg)})

        self.__xmldebug = None
        self.__xmlfmdRoot = None
        self.__xmlnodePath = None
        self.__xmldcPushUri = None
        self.__xmldcPullUri = None
        self.__xmldcConfFile = None
        self.__xmladditionalArg = None
        self.__shouldWriteTag = True


    @property
    def xmldebug(self):
        """
        Getter
        @return __xmldebug
        """
        # Start of user code getxmldebug
        return self.__xmldebug
        # End of user code
    
    @xmldebug.setter
    def xmldebug(self, value):
        """
        Setter
        @param value The value to set __xmldebug with
        """
        # Start of user code setxmldebug
        self.__xmldebug = value
        # End of user code
    
    @xmldebug.deleter
    def xmldebug(self):
        """
        Deleter
        delete __xmldebug
        """
        # Start of user code delxmldebug
        del self.__xmldebug
        # End of user code
    @property
    def xmlfmdRoot(self):
        """
        Getter
        @return __xmlfmdRoot
        """
        # Start of user code getxmlfmdRoot
        return self.__xmlfmdRoot
        # End of user code
    
    @xmlfmdRoot.setter
    def xmlfmdRoot(self, value):
        """
        Setter
        @param value The value to set __xmlfmdRoot with
        """
        # Start of user code setxmlfmdRoot
        self.__xmlfmdRoot = value
        # End of user code
    
    @xmlfmdRoot.deleter
    def xmlfmdRoot(self):
        """
        Deleter
        delete __xmlfmdRoot
        """
        # Start of user code delxmlfmdRoot
        del self.__xmlfmdRoot
        # End of user code
    @property
    def xmlnodePath(self):
        """
        Getter
        @return __xmlnodePath
        """
        # Start of user code getxmlnodePath
        return self.__xmlnodePath
        # End of user code
    
    @xmlnodePath.setter
    def xmlnodePath(self, value):
        """
        Setter
        @param value The value to set __xmlnodePath with
        """
        # Start of user code setxmlnodePath
        self.__xmlnodePath = value
        # End of user code
    
    @xmlnodePath.deleter
    def xmlnodePath(self):
        """
        Deleter
        delete __xmlnodePath
        """
        # Start of user code delxmlnodePath
        del self.__xmlnodePath
        # End of user code
    @property
    def xmldcPushUri(self):
        """
        Getter
        @return __xmldcPushUri
        """
        # Start of user code getxmldcPushUri
        return self.__xmldcPushUri
        # End of user code
    
    @xmldcPushUri.setter
    def xmldcPushUri(self, value):
        """
        Setter
        @param value The value to set __xmldcPushUri with
        """
        # Start of user code setxmldcPushUri
        self.__xmldcPushUri = value
        # End of user code
    
    @xmldcPushUri.deleter
    def xmldcPushUri(self):
        """
        Deleter
        delete __xmldcPushUri
        """
        # Start of user code delxmldcPushUri
        del self.__xmldcPushUri
        # End of user code
    @property
    def xmldcPullUri(self):
        """
        Getter
        @return __xmldcPullUri
        """
        # Start of user code getxmldcPullUri
        return self.__xmldcPullUri
        # End of user code
    
    @xmldcPullUri.setter
    def xmldcPullUri(self, value):
        """
        Setter
        @param value The value to set __xmldcPullUri with
        """
        # Start of user code setxmldcPullUri
        self.__xmldcPullUri = value
        # End of user code
    
    @xmldcPullUri.deleter
    def xmldcPullUri(self):
        """
        Deleter
        delete __xmldcPullUri
        """
        # Start of user code delxmldcPullUri
        del self.__xmldcPullUri
        # End of user code
    @property
    def xmldcConfFile(self):
        """
        Getter
        @return __xmldcConfFile
        """
        # Start of user code getxmldcConfFile
        return self.__xmldcConfFile
        # End of user code
    
    @xmldcConfFile.setter
    def xmldcConfFile(self, value):
        """
        Setter
        @param value The value to set __xmldcConfFile with
        """
        # Start of user code setxmldcConfFile
        self.__xmldcConfFile = value
        # End of user code
    
    @xmldcConfFile.deleter
    def xmldcConfFile(self):
        """
        Deleter
        delete __xmldcConfFile
        """
        # Start of user code delxmldcConfFile
        del self.__xmldcConfFile
        # End of user code
    @property
    def xmladditionalArg(self):
        """
        Getter
        @return __xmladditionalArg
        """
        # Start of user code getxmladditionalArg
        return self.__xmladditionalArg
        # End of user code
    
    @xmladditionalArg.setter
    def xmladditionalArg(self, value):
        """
        Setter
        @param value The value to set __xmladditionalArg with
        """
        # Start of user code setxmladditionalArg
        self.__xmladditionalArg = value
        # End of user code
    
    @xmladditionalArg.deleter
    def xmladditionalArg(self):
        """
        Deleter
        delete __xmladditionalArg
        """
        # Start of user code delxmladditionalArg
        del self.__xmladditionalArg
        # End of user code

    @property
    def shouldWriteTag(self):
        """
        Getter
        @return __shouldWriteTag
        """
        # Start of user code getshouldWriteTag
        return self.__shouldWriteTag
        # End of user code
    
    @shouldWriteTag.setter
    def shouldWriteTag(self, value):
        """
        Setter
        @param value The value to set __shouldWriteTag with
        """
        # Start of user code setshouldWriteTag
        self.__shouldWriteTag = value
        # End of user code
    
    @shouldWriteTag.deleter
    def shouldWriteTag(self):
        """
        Deleter
        delete __shouldWriteTag
        """
        # Start of user code delshouldWriteTag
        del self.__shouldWriteTag
        # End of user code




    def create_xmldebug(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLBool
        @see GPCC.xmlRuntime.core.xmlobject
        """

        self.__xmldebug = XMLBool()
        self.__xmldebug.tag_name = "debug"
        return self.__xmldebug

    def set_xmldebug(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        self.__xmldebug =  XMLBool(value=value)
    def setFileLine_xmldebug(self, fileName, line):
        """
        Set the file name and line
        @param fileName The file name.
        @param line The line.
        """
        self.__xmldebug.fileName = fileName
        self.__xmldebug.lineInFile = line


    def create_xmlfmdRoot(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLString
        @see GPCC.xmlRuntime.core.xmlobject
        """

        self.__xmlfmdRoot = XMLString()
        self.__xmlfmdRoot.tag_name = "fmdRoot"
        return self.__xmlfmdRoot

    def set_xmlfmdRoot(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        self.__xmlfmdRoot =  XMLString(value=value)
    def setFileLine_xmlfmdRoot(self, fileName, line):
        """
        Set the file name and line
        @param fileName The file name.
        @param line The line.
        """
        self.__xmlfmdRoot.fileName = fileName
        self.__xmlfmdRoot.lineInFile = line


    def create_xmlnodePath(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLString
        @see GPCC.xmlRuntime.core.xmlobject
        """

        self.__xmlnodePath = XMLString()
        self.__xmlnodePath.tag_name = "nodePath"
        return self.__xmlnodePath

    def set_xmlnodePath(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        self.__xmlnodePath =  XMLString(value=value)
    def setFileLine_xmlnodePath(self, fileName, line):
        """
        Set the file name and line
        @param fileName The file name.
        @param line The line.
        """
        self.__xmlnodePath.fileName = fileName
        self.__xmlnodePath.lineInFile = line


    def create_xmldcPushUri(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLString
        @see GPCC.xmlRuntime.core.xmlobject
        """

        self.__xmldcPushUri = XMLString()
        self.__xmldcPushUri.tag_name = "dcPushUri"
        return self.__xmldcPushUri

    def set_xmldcPushUri(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        self.__xmldcPushUri =  XMLString(value=value)
    def setFileLine_xmldcPushUri(self, fileName, line):
        """
        Set the file name and line
        @param fileName The file name.
        @param line The line.
        """
        self.__xmldcPushUri.fileName = fileName
        self.__xmldcPushUri.lineInFile = line


    def create_xmldcPullUri(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLString
        @see GPCC.xmlRuntime.core.xmlobject
        """

        self.__xmldcPullUri = XMLString()
        self.__xmldcPullUri.tag_name = "dcPullUri"
        return self.__xmldcPullUri

    def set_xmldcPullUri(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        self.__xmldcPullUri =  XMLString(value=value)
    def setFileLine_xmldcPullUri(self, fileName, line):
        """
        Set the file name and line
        @param fileName The file name.
        @param line The line.
        """
        self.__xmldcPullUri.fileName = fileName
        self.__xmldcPullUri.lineInFile = line


    def create_xmldcConfFile(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLString
        @see GPCC.xmlRuntime.core.xmlobject
        """

        self.__xmldcConfFile = XMLString()
        self.__xmldcConfFile.tag_name = "dcConfFile"
        return self.__xmldcConfFile

    def set_xmldcConfFile(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        self.__xmldcConfFile =  XMLString(value=value)
    def setFileLine_xmldcConfFile(self, fileName, line):
        """
        Set the file name and line
        @param fileName The file name.
        @param line The line.
        """
        self.__xmldcConfFile.fileName = fileName
        self.__xmldcConfFile.lineInFile = line


    def create_xmladditionalArg(self):
        """
        Lambda for variable creation

        @return a xmlRuntime.types.XMLString list        
        @see GPCC.xmlRuntime.core.xmlobject
        """
        if self.__xmladditionalArg is None:
            self.__xmladditionalArg = []
        item = XMLString()
        item.tag_name = "additionalArg"
        return item

    def set_xmladditionalArg(self, value):
        """
        Set the variable
        @param value the value to store.
        """
        item = XMLString(value=value)
        self.__xmladditionalArg.append(item)




    def writeXml(self,file_,idtLvl):
        """
        Method writeXml
        ------------------------------------------------------------

        Write this object in the file

        @param file_ _io.TextIOWrapper. The file_ handler to write in
        @param idtLvl int. The level of indentation
        """
        attributes = {}
        simpleObject = ((self.__xmldebug, "debug"),
                        (self.__xmlfmdRoot, "fmdRoot"),
                        (self.__xmlnodePath, "nodePath"),
                        (self.__xmldcPushUri, "dcPushUri"),
                        (self.__xmldcPullUri, "dcPullUri"),
                        (self.__xmldcConfFile, "dcConfFile"),)
        simpleList = ((self.__xmladditionalArg, "additionalArg"),)

        indentEndTag = False
        
        if self.tag_name is None:# BAR False alarm pylint: disable=E0203
            self.tag_name = "IhmLauncherConfig" # BAR False alarm pylint: disable=W0201
        #Write start tag
        if self.__shouldWriteTag :
            self.writeIndent(file_,idtLvl)
            self.writeStartTag(file_, self.tag_name,**attributes)
            idtLvl += 1
        #Write XmlSimpleObjects
        for obj, name in simpleObject:
            if obj is None:
                continue
            if name == "content":
                file_.write(str(obj.getStringValue()))
            else:
                self.writeNewLine(file_)
                self.writeIndent(file_,idtLvl)
                self.writeStartTag(file_,name)
                file_.write(str(obj.getStringValue()))
                self.writeEndTag(file_,name)
                indentEndTag = True

        #Write simple lists
        for slst, name in simpleList:
            if slst is None:
                continue
            for sobj in slst:
                self.writeNewLine(file_)
                self.writeIndent(file_,idtLvl)
                self.writeStartTag(file_,name)
                file_.write(str(sobj.getStringValue()))
                self.writeEndTag(file_,name)
                indentEndTag = True

        #Write end tag
        if self.__shouldWriteTag :
            idtLvl -= 1
            if indentEndTag :
                self.writeNewLine(file_)
                self.writeIndent(file_,idtLvl)
            self.writeEndTag(file_,self.tag_name)



    def validate(self):# CBN DV6 TBC_CNES Number of branch depends on the xsd pylint: disable=too-many-branches
        """
        Validate this instance
        @return A list containing all the errors found
        """
        error = []

        if self.__xmldebug is None:
            exception = xmlexceptions.XMLRequiredObject('IhmLauncherConfig', 'debug')
            if self.fileName is not None:
                exception.setFileAndLine(self.fileName, self.lineInFile)
            error.append(exception)
        if self.__xmldebug is not None:
            valid, constraints = self.__xmldebug.validate()
            if not valid:
                exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig',
                                                                          'debug',
                                                                          'XMLBool',
                                                                          self.__xmldebug.getValue(),
                                                                          constraints)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.__xmldebug.lineInFile)
                error.append(exception)
                

        if self.__xmlfmdRoot is None:
            exception = xmlexceptions.XMLRequiredObject('IhmLauncherConfig', 'fmdRoot')
            if self.fileName is not None:
                exception.setFileAndLine(self.fileName, self.lineInFile)
            error.append(exception)
        if self.__xmlfmdRoot is not None:
            valid, constraints = self.__xmlfmdRoot.validate()
            if not valid:
                exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig',
                                                                          'fmdRoot',
                                                                          'XMLString',
                                                                          self.__xmlfmdRoot.getValue(),
                                                                          constraints)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.__xmlfmdRoot.lineInFile)
                error.append(exception)
                

        if self.__xmlnodePath is None:
            exception = xmlexceptions.XMLRequiredObject('IhmLauncherConfig', 'nodePath')
            if self.fileName is not None:
                exception.setFileAndLine(self.fileName, self.lineInFile)
            error.append(exception)
        if self.__xmlnodePath is not None:
            valid, constraints = self.__xmlnodePath.validate()
            if not valid:
                exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig',
                                                                          'nodePath',
                                                                          'XMLString',
                                                                          self.__xmlnodePath.getValue(),
                                                                          constraints)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.__xmlnodePath.lineInFile)
                error.append(exception)
                

        if self.__xmldcPushUri is None:
            exception = xmlexceptions.XMLRequiredObject('IhmLauncherConfig', 'dcPushUri')
            if self.fileName is not None:
                exception.setFileAndLine(self.fileName, self.lineInFile)
            error.append(exception)
        if self.__xmldcPushUri is not None:
            valid, constraints = self.__xmldcPushUri.validate()
            if not valid:
                exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig',
                                                                          'dcPushUri',
                                                                          'XMLString',
                                                                          self.__xmldcPushUri.getValue(),
                                                                          constraints)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.__xmldcPushUri.lineInFile)
                error.append(exception)
                

        if self.__xmldcPullUri is None:
            exception = xmlexceptions.XMLRequiredObject('IhmLauncherConfig', 'dcPullUri')
            if self.fileName is not None:
                exception.setFileAndLine(self.fileName, self.lineInFile)
            error.append(exception)
        if self.__xmldcPullUri is not None:
            valid, constraints = self.__xmldcPullUri.validate()
            if not valid:
                exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig',
                                                                          'dcPullUri',
                                                                          'XMLString',
                                                                          self.__xmldcPullUri.getValue(),
                                                                          constraints)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.__xmldcPullUri.lineInFile)
                error.append(exception)
                

        if self.__xmldcConfFile is None:
            exception = xmlexceptions.XMLRequiredObject('IhmLauncherConfig', 'dcConfFile')
            if self.fileName is not None:
                exception.setFileAndLine(self.fileName, self.lineInFile)
            error.append(exception)
        if self.__xmldcConfFile is not None:
            valid, constraints = self.__xmldcConfFile.validate()
            if not valid:
                exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig',
                                                                          'dcConfFile',
                                                                          'XMLString',
                                                                          self.__xmldcConfFile.getValue(),
                                                                          constraints)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.__xmldcConfFile.lineInFile)
                error.append(exception)
                

        if self.__xmladditionalArg is not None:
            if len(self.__xmladditionalArg) < 0  :
                exception = xmlexceptions.XMLInvalidList('IhmLauncherConfig',
                                                         'additionalArg',
                                                         len(self.__xmladditionalArg),
                                                         0,
                                                         -1)
                if self.fileName is not None:
                    exception.setFileAndLine(self.fileName, self.lineInFile)
                error.append(exception)
                
            for obj in self.__xmladditionalArg:
                valid, constraints = obj.validate()
                if not valid:
                    exception = xmlexceptions.XMLInvalidSimpleObjectException('IhmLauncherConfig', 
                                                                              'additionalArg', 
                                                                              'XMLString',
                                                                              self.__xmladditionalArg.getValue(),
                                                                              constraints)
                    if self.fileName is not None:
                        exception.setFileAndLine(self.fileName, obj.lineInFile)
                    error.append(exception)

        return error
