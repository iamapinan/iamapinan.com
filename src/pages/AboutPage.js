import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  return (
    <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div class="px-4 mx-auto max-w-2xl ">
      <h1 className="text-2xl font-bold text-blue-600">About the Author</h1>
      <div className="bio mt-4">
        <h2 className="text-xl font-semibold">Apinan Woratrakun</h2>
        <p className="text-gray-700 mt-2">
        I am a seasoned technology builder and team organizer, currently serving as a Chief Technology Officer. With extensive experience in cloud Linux command, Docker, cloud and mobile application development, and cultivating a DevOps culture, I excel at leading teams and managing complex projects. My expertise allows me to drive innovation and efficiency in various technological endeavors. </p>
        <h3 className="text-lg font-semibold mt-4">Specialties</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Cloud Linux command</li>
          <li>Docker and container orchestration tools</li>
          <li>Cloud & mobile application development</li>
          <li>DevOps development culture</li>
          <li>PHP development with Laravel framework</li>
          <li>JavaScript, React, React Native, Node.js development</li>
          <li>WordPress plugins and theme development</li>
          <li>Video streaming</li>
          <li>Business development</li>
          <li>Team development and management</li>
          <li>Product development and management</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Experience</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Chief Technology Officer at NSD Neuron</li>
          <li>Development Advisor at Mode Solution</li>
          <li>Committee Member at Thai Programmer Association</li>
          <li>Executive Committee Member at Digital World Association</li>
          <li>CEO at Gracer, Getters, iOTech Enterprise, and In and Out Technology</li>
          <li>Development Manager at KOK KOK SOLE</li>
          <li>CTO at Meta Park and Data Guardian</li>
          <li>IT Manager at Appsolute Thailand</li>
          <li>IT Advisor at SYSTHEM Services</li>
          <li>Lead Developer at Rich Media System</li>
          <li>Software Engineer at Ministry of Education Thailand</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Education</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Bachelor’s Degree in Information Technology from Sripatum University</li>
          <li>Computer Business at Pua College, Nan</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Languages</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Thai (Native or Bilingual)</li>
          <li>English (Professional Working)</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Certifications</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Basic Cipher I</li>
          <li>Python Programming for Young Data Scientist</li>
          <li>Mini MBA</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Publications</h3>
        <ul className="list-disc list-inside mt-2">
          <li>WordPress Hooks</li>
          <li>Dev ไม่มาก แต่อยาก Ops EP.01, EP.02, EP.03 (DevOps Course)</li>
          <li>Introduction to WordPress for Startup/SME</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Contact</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Email: iamapinan@gmail.com</li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/iamapinan/" className="text-blue-500">https://www.linkedin.com/in/iamapinan/</a></li>
          <li>YouTube: <a href="https://www.youtube.com/channel/UCfBTtP6_vgluRow9iMi-sfg" className="text-blue-500">https://www.youtube.com/channel/UCfBTtP6_vgluRow9iMi-sfg</a></li>
        </ul>
      </div>
    </div>
  </main>
  );
};

export default AboutPage;