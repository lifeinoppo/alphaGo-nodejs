__author__ = 'jxcjxcjzx'
#coding:utf-8
import os
import re
import time
import codecs
import requests
import simplejson
from bs4 import BeautifulSoup


PATH = os.path.dirname(os.path.abspath(__file__))




def array_test():
	index = 10
	arr = range(index)
	str_arr = map(str,arr)
	print str_arr



if __name__ == "__main__":
	array_test()

