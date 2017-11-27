# Produced by Acceleo Python Generator 1.1.2-R8

# -*- coding: utf-8 -*-
"""!
Project   : ISIS
Component : GPCCHS_L_IFL
@file     : __init__.py
@author   : isis
@date     : 
@brief    : /
@type     : Create
"""


# ====================================================================
# Start of user code HistoryZone
# HISTORY
#
# END-HISTORY
# End of user code HistoryZone
# ====================================================================


from GPCCHS_L_IFL.converter_test.TestActivator.testActivator import TestActivator

def create(ctx, parentPipe, args=None):
    """!
    @brief create : encapsulation of BundleActivator's launchActor
    @param : ctx The context
    @param : parentPipe The parent pipe
    @param : args Launching arguments
    """
    TestActivator.launchActor(ctx, parentPipe, args)
