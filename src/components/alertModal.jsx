import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Modal from './modal'


  
  export default function AlertModal({title,content,buttonTitle,onClick,open}) {
    return (
        <AlertDialog open={open}>
        <AlertDialogContent>
          <Modal
            title={title}
            content={content}
            buttonTitle={buttonTitle}
            onClick={onClick}
          />
        </AlertDialogContent>
      </AlertDialog>
      
    )
  }
  
  