//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.3.2 
// See <a href="https://javaee.github.io/jaxb-v2/">https://javaee.github.io/jaxb-v2/</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2020.06.20 at 05:23:09 PM CEST 
//


package org.w3._2001.xmlschema;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import org.joda.time.DateTime;

public class Adapter4
    extends XmlAdapter<String, DateTime>
{


    public DateTime unmarshal(String value) {
        return (services.app.carrequestservice.converter.TypeConverter.parseDate(value));
    }

    public String marshal(DateTime value) {
        return (services.app.carrequestservice.converter.TypeConverter.printDate(value));
    }

}
