import React, { useEffect, useState } from "react";


export default function Modal({isOpen, SetOpenModal, children }){

      if(isOpen) {
            return(
                  <div>
                        {children}
                  </div>
            )
      }
}