import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    title: "Frequently Asked Questions",
    rows: [

        {
            title: "What problem is Singular Jobs trying to solve ?",
            content: "The idea of Seraching Jobs from different platforms, is what Singular Jobs is trying to solve."
        }
        ,
        {
            title: "How is Singular Jobs different from other job listing platforms ?",
            content: "Unlike other platforms, Singular Jobs focuses on curating personalised job lists from different job platforms for its users so as to createa single gateway for apllying to jobs on different platforms."
        }
        ,
        {
            title: " What is vision of Singular Jobs ?",
            content: "Singular Jobs aims at becoming a personalised gateway to jobs listed on different job boards/sites."
        }
        ,
        {
            title: "Why should I use Singular Jobs ?",
            content: `Because of following points:Single gateway to access jobs on different platforms.
                        Saves times spent on searching job opportunities.
                        Helps in discovering opportunities at new ventures.
                        Helps in applying to jobs as soon as possible.
                        Provides exposure to newer and newer job platforms, which normally would be difficult.`
        }
        ,
        {
            title: `Why some jobs recommended are completely out of my skill domain which I mentioned in my profile?`,
            content: `Singular Jobs try to give its user sense of diversity, dicovery and explorability. To achieve it, Singular Jobs
                    predicts skills similar to your mentioned skills and uses these predicted skills as well to predict jobs for you.
                    Say, a user mentioned ML, NLP, Python, Mongodb as skills, so Singular Jobs predicts AI, DL, Django, Web Dev, Maths as
                    skills closely related and take them into account as well.`

        }
        ,
        {
            title: `What are Singular Jobs sessions ?`,
            content: `1 Singular Jobs session = duration of 6 hours.`
        }
        ,
        {
            title: `How much old jobs can I see on Singular Jobs ?`,
            content: `Jobs, 8-12 sessions old can be seen on Singular Jobs.`
        }
        ,
        {
            title: `How can I improve my job list ?`,
            content: `Mention your skills in as detailed manner as possible with proper keywords.`
        }
        ,
        {
            title: `Can I send request for feature addition or inclsuion of a particular platform or company career page ?`,
            content: `Surely. All you need to do is fill up the form and I will try my best to add your request to the platform.`
        }
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "#363064",
    rowTitleColor: "#363064",
    rowContentColor: 'black',
    arrowColor: "#363064",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function FaqPage() {

    return (
        <div className="faq-page">
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}